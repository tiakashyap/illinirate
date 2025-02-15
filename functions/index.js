/*
Defines updateCounts function to manage updates of review counts, averages
(difficultyAvg, ratingAvg, workloadAvg), and reviews array in Firestore.
Listens to changes in the 'Review' collection and triggers updateCounts
based on whether reviews are added, updated, or deleted.
Ensures data integrity by calculating and updating averages dynamically
based on review changes.
*/

const functions = require("firebase-functions");
const admin = require("firebase-admin");

// Initialize Firebase Admin SDK
admin.initializeApp();
const firestore = admin.firestore();

const courses = firestore.collection("Course");

/**
 * Updates review counts, averages, and review array in a Firestore document
 * for a course.
 */
async function updateCounts(courseDoc, changedData, updatedData, change) {
  // Get current snapshot of the Firestore document
  const snapshot = await courseDoc.get();

  // Log review fields for debugging
  const reviewKeys = Object.keys(changedData);
  console.log(`Review keys: ${reviewKeys}`);

  // Initialize an object to store updates to Firestore document
  const fieldsToUpdate = ["difficulty", "rating", "workload"];
  const updatedObject = {};
  const oldReviewCount = snapshot.get("reviewCount") || 0;

  // Iterate over keys that need updating
  for (const field of fieldsToUpdate) {
    const fieldAvg = `${field}Avg`;
    const oldAvg = snapshot.get(fieldAvg) || 0;
    let newAvg = 0;
    if (change != 0) {
      // If a review was added/deleted
      const newCount = oldReviewCount + change;
      if (newCount > 0) {
        newAvg = ((oldReviewCount * oldAvg) + (changedData[field] *
            change)) / newCount;
      }
      updatedObject[fieldAvg] = newAvg;

      console.log(`oldReviewAvg: ${oldAvg} newReviewAvg: ${newAvg}`);
    } else {
      // If a review was simply changed
      const oldReviewValue = changedData[field];
      const newReviewValue = updatedData[field];
      if (oldReviewCount > 0) {
        newAvg = ((oldReviewCount * oldAvg) - oldReviewValue +
        newReviewValue) / oldReviewCount;
      }
      updatedObject[fieldAvg] = newAvg;
      console.log(`oldReviewAvg: ${oldAvg} newReviewAvg: ${newAvg}`);
    }
  }

  // Update 'reviews' array in courseDoc
  const reviews = snapshot.get("reviews") || [];
  if (change === 1) {
    reviews.push(changedData);
  } else if (change === -1) {
    const index = reviews.findIndex((review) => review.id === changedData.id);
    if (index !== -1) {
      reviews.splice(index, 1);
    }
  } else if (change === +0) {
    const index = reviews.findIndex((review) => review.id === changedData.id);
    if (index !== -1) {
      reviews[index] = updatedData;
    }
  }

  updatedObject.reviews = reviews;
  updatedObject.reviewCount = reviews.length;

  // Update the review count, log updates, and update courseDoc
  updatedObject.reviewCount = oldReviewCount + change;
  console.log(`Updated keys: ${fieldsToUpdate}`);
  console.log(`Update object: ${JSON.stringify(updatedObject)}`);
  await courseDoc.set(updatedObject, {merge: true});
}

// Firestore trigger function for 'Reviews' collection
exports.documentWriteListener = functions.firestore
    .document("Review/{id}")
    .onWrite(async (change, context) => {
      console.log(`Timestamp: ${context.timestamp}`);

      // Determine if a review was added, updated, or deleted
      try {
        if (!change.before.exists) {
          // New review added
          const courseDoc = courses.doc(change.after.data().course);
          // Update counts and averages
          await updateCounts(courseDoc, change.after.data(), {}, +1);
        } else if (change.before.exists && change.after.exists) {
          // Review updated
          const courseDoc = courses.doc(change.after.data().course);
          // Update averages
          await updateCounts(courseDoc, change.before.data(),
              change.after.data(), +0);
        } else if (!change.after.exists) {
          // Review deleted
          const courseDoc = courses.doc(change.before.data().course);
          // Decrement counts and update averages
          await updateCounts(courseDoc, change.before.data(), {}, -1);
        } else {
          // Unexpected condition
          console.log(`In documentWriteListener, unexpected condition`);
        }
      } catch (error) {
        console.error(error);
      }
    });

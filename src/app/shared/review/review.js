import { doc, getDoc } from "firebase/firestore";
import { firestore } from "./firebaseConfig.js";
import { courseRouterLink } from "../course/course.js"

export async function courseRouterLinkFromReview(reviewId) {
    try {
      // Fetch the review document to get the courseId
      const reviewDocRef = doc(firestore, "Review", reviewId);
      const reviewDocSnap = await getDoc(reviewDocRef);
        
      if (!reviewDocSnap.exists()) {
        console.error("No such review!");
        return null;
      }
      
        const reviewData = reviewDocSnap.data();
        
        if (!reviewData.course) {
            console.error("No course reference found in review data!");
            return reviewData;
        }

        const courseId = reviewData.course.id;

        const courseLink = await courseRouterLink(courseId);

        return courseLink;
        
    } catch (error) {
      console.error("Error fetching course data:", error);
      return "/courses"; // Fallback or error route
    }
  }
  

export function ratingNumToString(num) {
    switch (num) {
      case 5: return "Strongly Liked";
      case 4: return "Liked";
      case 3: return "Neutral";
      case 2: return "Disliked";
      case 1: return "Strongly Disliked";
    }
    console.warn("Bad rating number");
    return "";
}

export function difficultyNumToString(num) {
    switch (num) {
      case 5: return "Very Hard";
      case 4: return "Hard";
      case 3: return "Medium";
      case 2: return "Easy";
      case 1: return "Very Easy";
    }
    console.warn("Bad difficulty number");
    return "";
}

/*
export function ratingsToStrings(reviews) {
    for (let rev of reviews) {
      rev.difficultyString = difficultyNumToString(rev.difficulty)
      rev.ratingString = ratingNumToString(rev.rating)
    }
    return reviews
}
*/
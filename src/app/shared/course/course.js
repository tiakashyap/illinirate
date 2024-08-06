import { Semesters, Years } from '../user/user.js'
// Generate router link for a course based on course data

export async function courseRouterLink(courseId) {
    try {
        // Reference to the course document using the courseId
        const courseDocRef = doc(firestore, "Course", courseId);

        // Fetch the course document
        const courseDocSnap = await getDoc(courseDocRef);

        if (courseDocSnap.exists()) {
            const courseData = courseDocSnap.data();
            let urlComponent = `/courses/${courseData.courseSubject}-${courseData.courseNumber}-${courseData.title}`;
            urlComponent = urlComponent.replace(/ /g, "-");
            return urlComponent;
        } else {
            console.error("No such course!");
            return "/courses"; // Fallback or error route
        }
    } catch (error) {
        console.error("Error fetching course data:", error);
        return "/courses"; // Fallback or error route
    }
}


// Sem Started

const SemYear = [];

for (const year of Years) {
  for (const semester of Semesters) {
    SemYear.push(`${semester} ${year}`);
  }
}

SemYear.reverse(); // Reverse the array to match the original order

export { SemYear };

// Define difficulties and ratings with values and views

const Difficulties = [
    { value: 5, view: 'Very Hard' },
    { value: 4, view: 'Hard' },
    { value: 3, view: 'Medium' },
    { value: 2, view: 'Easy' },
    { value: 1, view: 'Very Easy' },
];
  
const Ratings = [
    { value: 5, view: 'Strongly Liked' },
    { value: 4, view: 'Liked' },
    { value: 3, view: 'Neutral' },
    { value: 2, view: 'Disliked' },
    { value: 1, view: 'Strongly Disliked' },
];
  
export { Difficulties, Ratings };
  

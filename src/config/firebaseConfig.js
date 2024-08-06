import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD-TvatwTt-gWb57GycfsjnOfhOXVrQaKc",
  authDomain: "illinirate.firebaseapp.com",
  projectId: "illinirate",
  storageBucket: "illinirate.appspot.com",
  messagingSenderId: "421003273243",
  appId: "1:421003273243:web:076c10ff0eab49f0a8c4be",
  measurementId: "G-4FFCQYNFGD"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };

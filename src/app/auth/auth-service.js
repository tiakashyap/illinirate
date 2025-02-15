import { auth, firestore } from '../../config/firebaseConfig.js';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';
//import { useNavigate } from 'react-router-dom';


class AuthService {

  setNavigateFunction(navigate) {
    this.navigateFunction = navigate;
  }

  navigateTo(route) {
    if (this.navigateFunction) {
      this.navigateFunction(route);
    }
  }

  constructor() {
    // Parse user data from JSON string
    this.navigateFunction = null;
    this.userData = JSON.parse(localStorage.getItem('user')) || null;
    this.auth = auth;
    this.firestore = firestore;

    // Sets up an observer on the authentication state
    // Executed whenever the authentication state changes (e.g., user logs in or out)
    onAuthStateChanged(this.auth, async (user) => {
      if (user) { // Logged in
        this.userData = await this.setUserData(user);
      } else { // Not logged in
        this.userData = null;
        localStorage.setItem('user', JSON.stringify(null));
      }
    });
  }

  async setUserData(user) {
    // If user not logged in
    if (!user) {
      localStorage.setItem('user', JSON.stringify(null));
      console.error("User is not logged in.");
      return null;
    }

    const userDocRef = doc(this.firestore, "UserExtra", user.uid);
    const userDocSnap = await getDoc(userDocRef);

    // If user exists, update data
    if (userDocSnap.exists()) {
      const data = userDocSnap.data();
      user.semesterStarted = data.semesterStarted;
      user.firstName = data.firstName;
      user.lastName = data.lastName;
      user.reviews = data.reviews;
    }

    // Stores the updated user object in localStorage
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  }

  async login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;
      
      // If unverified email attempts to log in
      if (!user.emailVerified) {
        throw new Error('Email not verified. Please check your email for verification link.');
      }
      this.userData = await this.setUserData(user);
      this.navigateTo('/'); // Redirect to home page after sign in
    } catch (error) {
      console.error('Error during login:', error.message);
      throw error; // Optionally rethrow or handle error in the UI
    }
  }

  async signup(email, password, firstName, lastName, semesterStarted) {
    // Create new account
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    const user = userCredential.user;
    
    // Verify and update info
    await sendEmailVerification(user);
    await updateProfile(user, { displayName: `${firstName} ${lastName}` });
    
    await setDoc(doc(this.firestore, "UserExtra", user.uid), {
      uid: user.uid,
      semesterStarted,
      firstName,
      lastName,
      reviewFeedback: {}, 
      reviews: []
    });

    this.userData = await this.setUserData(user);
    await signOut(this.auth);
    this.navigateTo('/verify-email'); // Redirect to email verification page
  }

  async logout() {
    try {
      await signOut(this.auth);
      this.userData = null;
      localStorage.setItem('user', JSON.stringify(null));
      this.navigateTo('/logout'); // Redirect to logout page
    } catch (error) {
      console.error('Error during logout:', error.message);
      throw error; // Optionally rethrow or handle error in the UI
    }
  }

  async forgotPassword(email) {
    try {
      await sendPasswordResetEmail(this.auth, email);
    } catch (error) {
      // These do not seem to display...
      if (error.code === 'auth/user-not-found') {
        throw new Error('No account found with this email address.');
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('The email address is not valid.');
      } else {
        throw new Error('An error occurred while processing your request.');
      }
    }
  }

  async handleEmailAlreadyInUse(email, password) {
    try {
      // Sign in the existing user
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;

      if (user && !user.emailVerified) {
        // Send verification email again if not verified
        await sendEmailVerification(user);
        return 'An account with this email already exists and is not verified. Please check your email for verification instructions.';
      } else {
        await signOut(this.auth);
        return 'Email already exists. Please use a different email or log in.';
      }
    } catch (error) {
      throw new Error(error.message || 'An error occurred during sign up. Please try again.');
    }
  }

  async updateUserExtraData(firstName, lastName, semesterStarted) {
    const user = this.auth.currentUser;

    if (user) {
      await updateProfile(user, { displayName: `${firstName} ${lastName}` });
      await updateDoc(doc(this.firestore, "UserExtra", user.uid), {
        semesterStarted,
        firstName,
        lastName,
      });

      this.userData = await this.setUserData(user);
    }
  }

  async getUserDoc(uid) {
    const userDocRef = doc(this.firestore, "UserExtra", uid);
    const userDoc = await getDoc(userDocRef);
    return userDoc;
  }

  async resendVerification() {
    if (this.auth.currentUser) {
      await sendEmailVerification(this.auth.currentUser);
    }
  }

  async setReviewFeedback(reviewId, vote) {
    const user = this.auth.currentUser;

    if (user && user.emailVerified) {
      // Retrieve user and old vote on this review
      let helpful = { positive: 0, negative: 0 };
      const userDocRef = doc(this.firestore, "UserExtra", user.uid);
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();
      const oldVote = userData.reviewFeedback[reviewId];

      // Reset the vote
      if (oldVote !== undefined) {
        if (oldVote) 
          helpful.positive -= 1;
        else 
          helpful.negative -= 1;
      }

      // Update new vote
      if (vote === "positive") {
        helpful.positive += 1;
        userData.reviewFeedback[reviewId] = true;
      } else if (vote === "negative") {
        helpful.negative += 1;
        userData.reviewFeedback[reviewId] = false;
      } else {
        delete userData.reviewFeedback[reviewId];
      }

      // Update review doc
      await updateDoc(userDocRef, { reviewFeedback: userData.reviewFeedback });
      const reviewDocRef = doc(this.firestore, "Reviews", reviewId);
      await updateDoc(reviewDocRef, {
        'helpful': increment(helpful.positive),
        'notHelpful': increment(helpful.negative),
      });

      return true;
    }

    return false;
  }
}

const authService = new AuthService();

export default authService;

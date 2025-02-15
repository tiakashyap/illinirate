import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './auth/auth-context.js';
import AuthServiceWrapper from './auth/auth-service-wrapper.js';
import PrivateRoute from './auth/private-route.js';
import Main from './main/main.js';
import Navbar from './navigation/navbar/navbar.js';
import Login from "./user/login/login.js"
import Signup from "./user/signup/signup.js"
import VerifyEmail from './user/verify-email/verify-email.js';
import ForgotPassword from './user/forgot-password/forgot-password.js';
import Logout from './user/logout/logout.js';
import SubmitFeedback from './user/feedback/feedback.js';
import Profile from './user/profile/profile.js';

function App() {
  return (
    <Router>
      <AuthProvider>
        <AuthServiceWrapper>
          <Navbar />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/home" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/register" element={<Signup />} />
            
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/feedback" element={<SubmitFeedback />} />

            {/* Protected Routes */}
            
            <Route
              path="/logout"
              element={
                <PrivateRoute requiresVerification={true}>
                  <Logout />
                </PrivateRoute>
              }
            />

            <Route
              path="/verify-email"
              element={
                <PrivateRoute>
                  <VerifyEmail />
                </PrivateRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <PrivateRoute requiresVerification={true}>
                  <Profile />
                </PrivateRoute>
              }
            />
          </Routes>
        </AuthServiceWrapper>
      </AuthProvider>
    </Router>
  );
}

export default App;

/*

            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/create-review"
              element={
                <PrivateRoute>
                  <CreateReview />
                </PrivateRoute>
              }
            />

*/
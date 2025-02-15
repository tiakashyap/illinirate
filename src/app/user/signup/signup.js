import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Semesters, Years } from '../../shared/user/user.js'
import authService from '../../auth/auth-service.js';
import AuthContext from '../../auth/auth-context.js';
import { processError } from '../../../util/error-handling.js'
import './signup.css'; 
import '../login/login.css'; 
import { signOut } from 'firebase/auth';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [semester, setSemester] = useState('');
  const [year, setYear] = useState('');
  const [error, setError] = useState('');

  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  // Get the path the user was trying to access
  const from = location.state?.from || '/'; 

  useEffect(() => {
    // Redirect to home if the user is already logged in
    if (user) {
      navigate(from !== '/login' && from !== '/signin' ? from : '/', { replace: true });
    }
  }, [user, navigate]);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      
      await authService.signup(email, password, firstName, lastName, `${semester} ${year}`);
      setError('');
    } catch (error) {

      if (error.code === 'auth/email-already-in-use') {
        // Handle the case where the email is already in use
        try {
          const message = await authService.handleEmailAlreadyInUse(email, password);
          setError(message);
        } catch (err) {
          setError(err.message || 'An error occurred during sign up. Please try again.');
        }
      } else {
        setError(error.message || 'An error occurred during sign up. Please try again.');
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2 className="title-center">Sign Up</h2>
        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              placeholder="Enter first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              placeholder="Enter last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="semester">First Semester</label>
            <div className="form-group-inline">
              <select
                id="semester"
                className="form-control-inline"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                required
              >
                <option value="">Select Semester</option>
                {Semesters.map((sem) => (
                  <option key={sem} value={sem}>{sem}</option>
                ))}
              </select>
              <select
                id="year"
                className="form-control-inline"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
              >
                <option value="">Select Year</option>
                {Years.map((yr) => (
                  <option key={yr} value={yr}>{yr}</option>
                ))}
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
        </form>
        {error && <div className="message">{error}</div>}
        <div className="text-center mt-3">
          Already have an account? <Link to="/signin">Log in instead!</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;

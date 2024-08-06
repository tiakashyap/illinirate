import React, { useState } from 'react';
import authService from '../../auth/auth-service.js'
import './forgot-password.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    // Prevent multiple submissions while processing
    if (isSubmitting) return;

    setIsSubmitting(true);
    setShowMessage(false); // Hide the message while submitting

    try {
      // Simulate an API call
      await authService.forgotPassword(email);

      setMessage('An email has been sent to your inbox to reset your password.');
      setShowMessage(true);
    } catch (error) {
      setMessage('There was an error processing your request. Please try again.');
      setShowMessage(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-form">
        <h2 className="title-center">Forgot Password</h2>
        <form onSubmit={handleForgotPassword}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Submit'}
          </button>
        </form>
        {showMessage && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;

import React, { useState } from 'react';
import './verify-email.css';

const VerifyEmail = () => {
  const [isRequesting, setIsRequesting] = useState(false);
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const handleRequestVerification = async () => {
    // Prevent multiple requests while processing
    if (isRequesting) return;

    setIsRequesting(true);
    setShowMessage(false); // Hide the message while requesting

    try {
      //resend verification
      setMessage('A new verification link has been sent to your email.');
      setShowMessage(true);
    } catch (error) {
      setMessage('There was an error requesting a new verification link. Please try again.');
      setShowMessage(true);
    } finally {
      setIsRequesting(false);
    }
  };

  return (
    <div className="verify-email-container">
      <div className="verify-email-form">
        <h2 className="title-center">Verify Your Email</h2>
        <p className="text-center">Please check your email for a verification link. If you haven't received it, you can request a new one.</p>
        <button 
          className="btn btn-primary btn-block"
          onClick={handleRequestVerification}
          disabled={isRequesting}
        >
          {isRequesting ? 'Requesting...' : 'Request a New Verification Link'}
        </button>
        {showMessage && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default VerifyEmail;
import React, { useState } from 'react';
import './feedback.css';

const SubmitFeedback = () => {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      
      setFeedbackMessage('Thank you for your feedback!');
      setMessage('');
    } catch (error) {
      setFeedbackMessage('There was an error submitting your feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="feedback-container">
      <div className="feedback-form">
        <h2 className="title-center">Submit Feedback</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="message">Feedback</label>
            <textarea
              className="form-control"
              id="message"
              rows="5"
              placeholder="Enter your feedback"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
        {!isSubmitting && feedbackMessage && <p className="feedback-message">{feedbackMessage}</p>}
      </div>
    </div>
  );
};

export default SubmitFeedback;

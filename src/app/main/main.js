import React from 'react';
import './main.css';

const Main = () => {
  return (
      <div style={{ display: 'flex' }} className="main-container">
        <main className="main-content">
          <section className="intro">
            <h2>Welcome to IlliniRate!</h2>
            <p>IlliniRate is your go-to platform for evaluating and sharing feedback on undergraduate courses from the University of Illinois at Urbana-Champaign.</p>
          </section>
          <section className="what-we-offer">
            <h3>What We Offer</h3>
            <ul>
              <li><strong>Rate and Review Courses:</strong> Share your experiences and rate courses based on difficulty, workload, and overall satisfaction. Your feedback helps future students make informed decisions.</li>
              <li><strong>View Reviews:</strong> Browse through detailed reviews from fellow students to get insights on specific courses, including ratings on difficulty and workload.</li>
              <li><strong>Manage Your Profile:</strong> Update your profile information, track your review history, and ensure your details are up-to-date.</li>
            </ul>
          </section>
          <footer className="footer">
            <div className="footer-links">
              <a href="https://github.com/tiakashyap/illinirate" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="/feedback">Submit Feedback</a>
            </div>
          </footer>
        </main>
      </div>
  );
};

export default Main;

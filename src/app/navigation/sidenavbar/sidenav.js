import React from 'react';
import { Link } from 'react-router-dom';
import './sidenav.css'; 

const Sidenav = ({ isOpen, onClose, user }) => {
  return (
    <div className={`sidenav ${isOpen ? 'open' : ''}`}>
      <button className="sidenav-close" onClick={onClose}>
        <i className="bi bi-x"></i>
      </button>
      <Link to="/home">Home</Link>
      <Link to="/courses">Courses</Link>
      <Link to="/reviews">Reviews</Link>
      {user && user.emailVerified ? (
        <>
          <Link to="/create-review" onClick={onClose}>Create Review</Link>
          <Link to="/profile" onClick={onClose}>Profile</Link>
          <Link to="/logout" onClick={onClose}>Log Out</Link>
        </>
      ) : (
        <Link to="/login" onClick={onClose}>Log In</Link>
      )}
    </div>
  );
};

export default Sidenav;

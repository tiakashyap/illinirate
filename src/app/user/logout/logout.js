import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../auth/auth-service.js';
import './logout.css';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      authService.logout();
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect to login page after logout
      navigate('/');
    };

    logoutUser();
  }, [navigate]);

  return (
    <div className="logout-container">
      <div className="logout-message">
        <h2>You have been logged out</h2>
        <p>Redirecting you to the home page...</p>
      </div>
    </div>
  );
};

export default Logout;

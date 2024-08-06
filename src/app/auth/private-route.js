import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './auth-context.js';

const PrivateRoute = ({ children, requiresVerification = false }) => {
  const { user, isVerified } = useAuth();

  if (!user) {
    return <Navigate to="/login" state={{ from: window.location.pathname }} />;
  }

  if (requiresVerification && !isVerified) {
    return <Navigate to="/verify-email" />;
  }

  return children;
};

export default PrivateRoute;

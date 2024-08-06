import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from './auth-service.js';

const AuthServiceWrapper = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    authService.setNavigateFunction(navigate);
  }, [navigate]);

  return <>{children}</>;
};

export default AuthServiceWrapper;

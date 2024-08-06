import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../../auth/auth-context.js';
import authService from '../../auth/auth-service.js';
import { processError } from '../../../util/error-handling.js'
import './login.css'; 


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  // Get the path the user was trying to access
  const from = location.state?.from || '/'; 

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await authService.login(email, password);
      setError('');
      navigate(from, { replace: true });
    } catch (error) {
      setError(processError(error) || 'An error occurred during login. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2 className="title-center">Log In</h2>
        {user ? (
          <div className="logging-in-message">
            <p>Logging in...</p>
          </div>
        ) : (
        <form onSubmit={handleLogin}>
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
          <button type="submit" className="btn btn-primary btn-block">Log In</button>
        </form>
        )}
        {error && <div className="message">{error}</div>}
        {!user && (
          <>
            <div className="text-center mt-3">
              Don't have an account? <Link to="/signup">Sign up instead!</Link>
            </div>
            <div className="text-center mt-3">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;

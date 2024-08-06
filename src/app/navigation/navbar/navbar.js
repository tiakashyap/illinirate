import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import Sidenav from '../sidenavbar/sidenav.js';
import AuthContext from '../../auth/auth-context.js';

const Navbar = () => {
  const [isSidenavOpen, setSidenavOpen] = useState(false);
  const { user } = useContext(AuthContext);

  const toggleSidenav = () => {
    setSidenavOpen(!isSidenavOpen);
  };

  const closeSidenav = () => {
    setSidenavOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/">Home</Link>
          <Link to="/courses">Courses</Link>
          <Link to="/reviews">Reviews</Link>
        </div>
        <div className="navbar-right">
          {user ? (
            <>
              <Link to="/create-review">Create Review</Link>
              <Link to="/profile">Profile</Link>
              <Link to="/logout">Log Out</Link>
            </>
          ) : (
            <Link to="/login">Log In</Link>
          )}
        </div>
        <button className="sidenav-toggle" onClick={toggleSidenav}>
          <i className="bi bi-list"></i>
        </button>
      </nav>
      <Sidenav isOpen={isSidenavOpen} onClose={closeSidenav} user={user} />
    </>
  );
};

export default Navbar;

import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../auth/auth-context.js';
import authService from '../../auth/auth-service.js';
import { Semesters, Years } from '../../shared/user/user.js';
import './profile.css';

const Profile = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [semester, setSemester] = useState('');
  const [year, setYear] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        setEmail(user.email);
        const userDoc = await authService.getUserDoc(user.uid);
        if (userDoc.exists) {
          const userData = userDoc.data();
          setFirstName(userData.firstName);
          setLastName(userData.lastName);
          const [sem, yr] = userData.semesterStarted.split(' ');
          setSemester(sem);
          setYear(yr);
        }
      }
    };

    fetchUserData();
  }, [user]);

  const handleSave = async () => {
    try {
      const user = authService.getCurrentUser(); 
      if (user) {
        await authService.updateUserExtraData(firstName, lastName, `${semester} ${year}`);
        setIsEditing(false); // Switch back to static mode after saving
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-form">
        <h2 className="title-center">Profile</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control static"
            id="email"
            value={email}
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            className={`form-control ${isEditing ? 'editable' : 'static'}`}
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            disabled={!isEditing}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            className={`form-control ${isEditing ? 'editable' : 'static'}`}
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            disabled={!isEditing}
          />
        </div>
        <div className="form-group">
          <label htmlFor="semester">First Semester</label>
          <div className="form-group-inline">
            <select
              id="semester"
              className={`form-control-inline ${isEditing ? 'editable' : 'static'}`}
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              disabled={!isEditing}
            >
              <option value="">Select Semester</option>
              {Semesters.map((sem) => (
                <option key={sem} value={sem}>
                  {sem}
                </option>
              ))}
            </select>
            <select
              id="year"
              className={`form-control-inline ${isEditing ? 'editable' : 'static'}`}
              value={year}
              onChange={(e) => setYear(e.target.value)}
              disabled={!isEditing}
            >
              <option value="">Select Year</option>
              {Years.map((yr) => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          className="btn btn-primary btn-block"
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>
    </div>
  );
};

export default Profile;

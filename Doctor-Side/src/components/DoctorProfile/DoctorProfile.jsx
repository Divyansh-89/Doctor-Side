import React from 'react';
import DoctorAchievements from './DoctorAchievements';
import DoctorWorkDetails from './DoctorWorkDetails';
import DoctorLeaveManagement from './DoctorLeaveManagement';
import DoctorFeedback from './DoctorFeedback';
import './DoctorProfile.css';

export default function DoctorProfile() {
  return (
    <div className="container">
      <div className="doctor-profile-page">
        <div className="content-wrapper">
          <DoctorAchievements />
          <DoctorWorkDetails />
          <DoctorLeaveManagement />
        </div>
      </div>
      <DoctorFeedback />
    </div>
  );
}

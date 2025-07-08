import React from "react";
import defaultDoctorAvatar from '../../assets/istockphoto-2077095666-612x612.jpg';

export default function DoctorDashboardGreeting({ user, avatar, quote }) {
  return (
    <div className="welcome-section-content">
      <img src={avatar || defaultDoctorAvatar} alt="Doctor Avatar" className="welcome-avatar" />
      <div className="welcome-text-and-quote">
        <h1 className="gradient-heading">Hello {user.name}, Welcome Back!</h1>
        <p className="welcome-tagline-replaced-by-quote">{quote}</p>
      </div>
    </div>
  );
}
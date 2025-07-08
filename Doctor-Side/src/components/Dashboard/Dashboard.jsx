import React from "react";
import "./Dashboard.css";
import defaultDoctorAvatar from '../../assets/istockphoto-2077095666-612x612.jpg';
import patientsData from "../../data/patients";
import DoctorDashboardGreeting from "./DashboardGreeting";
import DoctorNotificationBell from "./NotificationBell";

const doctorQuotes = [
  "The art of medicine consists of amusing the patient while nature cures the disease.",
  "Wherever the art of medicine is loved, there is also a love of humanity.",
  "The good physician treats the disease; the great physician treats the patient who has the disease.",
  "Medicine is a science of uncertainty and an art of probability.",
];

function TopAppointmentsList({ appointments }) {
  if (!appointments.length) {
    return <p>No upcoming appointments.</p>;
  }
  return (
    <div className="top-appointments-grid">
      {appointments.map(app => (
        <div
          key={app.id}
          className={`appointment-box${app.isNew ? " new-appointment-box" : ""}`}
        >
          <div className="appointment-name">{app.name}</div>
          <div className="appointment-time">{app.formatted_time}</div>
          {app.isNew && <span className="appointment-new-badge">New</span>}
        </div>
      ))}
    </div>
  );
}

export default function DoctorDashboardPage({ user, alerts = [] }) {
  const quote = doctorQuotes[Math.floor(Math.random() * doctorQuotes.length)];

  const upcomingAppointments = patientsData
    .filter(p => p.appointment && p.appointment.active)
    .map(p => ({
      id: p.id,
      name: p.name,
      formatted_time: p.appointment.formatted_time,
      isNew: p.appointment.isNew || false,
    }))
    .slice(0, 3);

  return (
    <div className="container">
      <div className="dashboard-container">
        <div className="dashboard-left">
          <DoctorDashboardGreeting
            user={user}
            avatar={user.avatarUrl || defaultDoctorAvatar}
            quote={quote}
          />
        </div>
        <div className="dashboard-right">
          <DoctorNotificationBell appointments={upcomingAppointments} />
          <div className="top-appointments-section">
            <h3>Top Upcoming Appointments</h3>
            <TopAppointmentsList appointments={upcomingAppointments} />
          </div>
        </div>
      </div>
    </div>
  );
}

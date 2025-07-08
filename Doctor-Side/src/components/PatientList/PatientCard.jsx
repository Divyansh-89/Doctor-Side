import React from "react";

function isPastAppointment(formatted_time) {
  const dt = new Date(formatted_time);
  return Date.now() > dt.getTime();
}

export default function PatientCard({ patient, onClick, onMarkNoAppointmentClick }) {
  const showMarkNoAppointment =
    patient.appointment &&
    patient.appointment.active &&
    isPastAppointment(patient.appointment.formatted_time);

  return (
    <div className="appointment-card" onClick={onClick} style={{ position: "relative" }}>
      <strong>{patient.name}</strong>
      <div className="appointment-details">
        {patient.appointment && patient.appointment.active ? (
          <>
            <div className="appointment-time">
              Time: <span>{patient.appointment.formatted_time}</span>
            </div>
            <div className="appointment-status-active">Active</div>
            {patient.appointment.isNew && (
              <span className="appointment-label-new">New</span>
            )}
            {showMarkNoAppointment && (
              <button
                className="mark-no-appointment-btn"
                onClick={e => {
                  e.stopPropagation();
                  onMarkNoAppointmentClick();
                }}
              >
                Mark as No Appointment
              </button>
            )}
          </>
        ) : (
          <div>
            <span className="appointment-status-no-appointment">No appointment</span>
            {patient.notes && (
              <div className="patient-notes">Notes: {patient.notes}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

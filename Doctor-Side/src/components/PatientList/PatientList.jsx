import React from "react";
import PatientCard from "./PatientCard";

export default function PatientList({ patients, isFading, onCardClick, onMarkNoAppointmentClick }) {
  if (patients.length === 0 && !isFading) {
    return <div className="empty-state">No patients found.</div>;
  }
  return (
    <div className={`appointment-list${isFading ? " fade" : ""}`}>
      {patients.map(patient => (
        <PatientCard
          key={patient.id}
          patient={patient}
          onClick={() => onCardClick(patient.id)}
          onMarkNoAppointmentClick={() => onMarkNoAppointmentClick(patient.id)}
        />
      ))}
    </div>
  );
}

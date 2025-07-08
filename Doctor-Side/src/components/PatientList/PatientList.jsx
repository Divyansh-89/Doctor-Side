import React from "react";
import PatientCard from "./PatientCard";

export default function PatientList({ patients, isFading, onCardClick, onMarkNoAppointmentClick }) {
  if (!patients.length && !isFading) {
    return <div className="empty-state">No patients found.</div>;
  }

  return (
    <div className={`appointment-list${isFading ? " fade" : ""}`}>
      {patients.map(p => (
        <PatientCard
          key={p.id}
          patient={p}
          onClick={() => onCardClick(p.id)}
          onMarkNoAppointmentClick={() => onMarkNoAppointmentClick(p.id)}
        />
      ))}
    </div>
  );
}

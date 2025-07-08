import React, { useState, useEffect } from "react";
import initialPatients from "../../data/patients";
import PatientTabs from "./PatientTabs";
import PatientList from "./PatientList";
import NotesModal from "./NotesModal";
import "./PatientListPage.css";

const TABS = [
  { key: "active", label: "Active" },
  { key: "inactive", label: "No Appointment" }
];

export default function PatientListPage() {
  const [tab, setTab] = useState("active");
  const [isFading, setIsFading] = useState(false);
  const [patients, setPatients] = useState(initialPatients);
  const [displayedPatients, setDisplayedPatients] = useState([]);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  useEffect(() => {
    setIsFading(true);
    const timer = setTimeout(() => {
      const filtered = patients.filter(patient => {
        if (tab === "active") {
          return patient.appointment && patient.appointment.active;
        }
        return !patient.appointment || !patient.appointment.active;
      });
      setDisplayedPatients(filtered);
      setIsFading(false);
    }, 350);
    return () => clearTimeout(timer);
  }, [tab, patients]);

  const handleCardClick = (id) => {
    setPatients(prev =>
      prev.map(patient =>
        patient.id === id && patient.appointment && patient.appointment.isNew
          ? { ...patient, appointment: { ...patient.appointment, isNew: false } }
          : patient
      )
    );
  };

  const handleMarkNoAppointmentClick = (id) => {
    setSelectedPatientId(id);
    setShowNotesModal(true);
  };

  const handleSaveNotes = (notes) => {
    setPatients(prev =>
      prev.map(patient =>
        patient.id === selectedPatientId
          ? { ...patient, appointment: null, notes: notes }
          : patient
      )
    );
    setShowNotesModal(false);
    setSelectedPatientId(null);
  };

  const handleCancelNotes = () => {
    setShowNotesModal(false);
    setSelectedPatientId(null);
  };

  return (
    <div className="AppointmentsPage-root">
      <h2>Patient List</h2>
      <PatientTabs tabs={TABS} activeTab={tab} onTabChange={setTab} />
      <PatientList
        patients={displayedPatients}
        isFading={isFading}
        onCardClick={handleCardClick}
        onMarkNoAppointmentClick={handleMarkNoAppointmentClick}
      />
      {showNotesModal && (
        <NotesModal
          onSave={handleSaveNotes}
          onCancel={handleCancelNotes}
        />
      )}
    </div>
  );
}

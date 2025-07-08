import React, { useState } from "react";
import "./PatientListPage";

export default function NotesModal({ onSave, onCancel }) {
  const [notes, setNotes] = useState("");

  const saveNotes = (e) => {
    e.preventDefault();
    onSave(notes);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Add Notes for No Appointment</h3>
        <form onSubmit={saveNotes}>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Enter notes for the patient..."
            rows={5}
            required
          />
          <div className="modal-actions">
            <button type="submit" className="create-btn">Save</button>
            <button type="button" className="cancel-btn" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import React from "react";

export default function LeaveModal({ open, values, onChange, onClose, onSubmit }) {
    if (!open) return null;
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" aria-label="Close" onClick={onClose}>
                    &times;
                </button>
                <h3>Apply for Leave</h3>
                <form onSubmit={onSubmit}>
                    <label>
                        Leave Type:
                        <select
                            name="type"
                            value={values.type}
                            onChange={onChange}
                        >
                            <option value="Annual Leave">Annual Leave</option>
                            <option value="Sick Leave">Sick Leave</option>
                            <option value="Casual Leave">Casual Leave</option>
                            <option value="Unpaid Leave">Unpaid Leave</option>
                        </select>
                    </label>
                    <label>
                        Start Date:
                        <input
                            type="date"
                            name="startDate"
                            value={values.startDate}
                            onChange={onChange}
                        />
                    </label>
                    <label>
                        End Date:
                        <input
                            type="date"
                            name="endDate"
                            value={values.endDate}
                            onChange={onChange}
                        />
                    </label>
                    <label>
                        Reason:
                        <textarea
                            name="reason"
                            value={values.reason}
                            onChange={onChange}
                            placeholder="e.g., Family vacation, personal appointment, etc."
                        ></textarea>
                    </label>
                    <div className="form-actions">
                        <button type="submit" className="submit-button">
                            Submit Request
                        </button>
                        <button
                            type="button"
                            className="cancel-button"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

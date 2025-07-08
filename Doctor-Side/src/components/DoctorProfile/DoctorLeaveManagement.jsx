import React, { useState } from "react";

export default function DoctorLeaveManagement() {
    const [leaveBalance, setLeaveBalance] = useState({
        annual: 15,
        sick: 10,
        casual: 5,
    });
    const [upcomingLeaves, setUpcomingLeaves] = useState([
        {
            id: 1,
            type: "Annual Leave",
            startDate: "2025-08-10",
            endDate: "2025-08-15",
            reason: "Family vacation",
            status: "approved",
        },
        {
            id: 2,
            type: "Sick Leave",
            startDate: "2025-07-20",
            endDate: "2025-07-20",
            reason: "Sudden illness",
            status: "pending",
        },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newLeave, setNewLeave] = useState({
        type: "Annual Leave",
        startDate: "",
        endDate: "",
        reason: "",
    });
    const [message, setMessage] = useState("");

    const resetModal = () => {
        setNewLeave({
            type: "Annual Leave",
            startDate: "",
            endDate: "",
            reason: "",
        });
        setMessage("");
        setIsModalOpen(false);
    };

    const isPastDate = (dateStr) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const inputDate = new Date(dateStr);
        inputDate.setHours(0, 0, 0, 0);
        return inputDate < today;
    };

    const handleApplyLeave = (e) => {
        e.preventDefault();

        if (!newLeave.startDate || !newLeave.endDate || !newLeave.reason) {
            setMessage("Please fill in all fields.");
            setTimeout(() => setMessage(""), 3000);
            return;
        }
        if (new Date(newLeave.startDate) > new Date(newLeave.endDate)) {
            setMessage("Start date cannot be after end date.");
            setTimeout(() => setMessage(""), 3000);
            return;
        }
        if (isPastDate(newLeave.startDate)) {
            setMessage("Leave cannot be applied for past dates.");
            setTimeout(() => setMessage(""), 3000);
            return;
        }

        const newLeaveRequest = {
            id: upcomingLeaves.length + 1,
            ...newLeave,
            status: "pending",
        };

        setUpcomingLeaves([...upcomingLeaves, newLeaveRequest]);
        setMessage("Leave application submitted successfully!");
        setTimeout(() => setMessage(""), 3000);

        resetModal();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewLeave({ ...newLeave, [name]: value });
    };

    return (
        <section className="doctor-leave-management">
            <h2>Leave Management</h2>

            <div className="leave-summary">
                <span>
                    Annual Leave: <strong>{leaveBalance.annual}</strong>
                </span>
                <span>
                    Sick Leave: <strong>{leaveBalance.sick}</strong>
                </span>
                <span>
                    Casual Leave: <strong>{leaveBalance.casual}</strong>
                </span>
            </div>

            <div className="upcoming-leaves">
                <h3>Upcoming & Recent Leaves</h3>
                {upcomingLeaves.length > 0 ? (
                    <ul>
                        {upcomingLeaves
                            .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
                            .map((leave) => (
                                <li key={leave.id} className="leave-item">
                                    <span className="leave-info">
                                        <strong>Type:</strong> {leave.type}
                                    </span>
                                    <span className="leave-info">
                                        <strong>Dates:</strong> {leave.startDate} to {leave.endDate}
                                    </span>
                                    <span className="leave-info">
                                        <strong>Reason:</strong> {leave.reason}
                                    </span>
                                    <span className={`leave-status ${leave.status}`}>
                                        {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                                    </span>
                                </li>
                            ))}
                    </ul>
                ) : (
                    <p>No upcoming leaves.</p>
                )}
            </div>

            <button
                className="apply-leave-button animated-button"
                onClick={() => setIsModalOpen(true)}
            >
                Apply for Leave
            </button>

            {message && <div className="message">{message}</div>}

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-button" aria-label="Close" onClick={resetModal}>
                            &times;
                        </button>
                        <h3>Apply for Leave</h3>
                        <form onSubmit={handleApplyLeave}>
                            <label>
                                Leave Type:
                                <select
                                    name="type"
                                    value={newLeave.type}
                                    onChange={handleInputChange}
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
                                    value={newLeave.startDate}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label>
                                End Date:
                                <input
                                    type="date"
                                    name="endDate"
                                    value={newLeave.endDate}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label>
                                Reason:
                                <textarea
                                    name="reason"
                                    value={newLeave.reason}
                                    onChange={handleInputChange}
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
                                    onClick={resetModal}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}

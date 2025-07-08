import React, { useState } from "react";
import LeaveSummary from "./LeaveSummary";
import LeaveList from "./LeaveList";
import LeaveModal from "./LeaveModal";


export default function DoctorLeaveManagement() {
    const [leaveBalance] = useState({
        annual: 15,
        sick: 10,
        casual: 5,
    });

    const [leaves, setLeaves] = useState([
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

    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({
        type: "Annual Leave",
        startDate: "",
        endDate: "",
        reason: "",
    });
    const [msg, setMsg] = useState("");

    const resetForm = () => {
        setForm({
            type: "Annual Leave",
            startDate: "",
            endDate: "",
            reason: "",
        });
        setMsg("");
        setShowModal(false);
    };

    const isPastDate = (dateStr) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const input = new Date(dateStr);
        input.setHours(0, 0, 0, 0);
        return input < today;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.startDate || !form.endDate || !form.reason) {
            setMsg("Please fill in all fields.");
            setTimeout(() => setMsg(""), 3000);
            return;
        }
        if (new Date(form.startDate) > new Date(form.endDate)) {
            setMsg("Start date cannot be after end date.");
            setTimeout(() => setMsg(""), 3000);
            return;
        }
        if (isPastDate(form.startDate)) {
            setMsg("Leave cannot be applied for past dates.");
            setTimeout(() => setMsg(""), 3000);
            return;
        }
        const newLeave = {
            id: leaves.length + 1,
            ...form,
            status: "pending",
        };
        setLeaves([...leaves, newLeave]);
        setMsg("Leave application submitted successfully!");
        setTimeout(() => setMsg(""), 3000);
        resetForm();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <section className="doctor-leave-management">
            <h2>Leave Management</h2>
            <LeaveSummary balance={leaveBalance} />
            <div className="upcoming-leaves">
                <h3>Upcoming & Recent Leaves</h3>
                <LeaveList leaves={leaves} />
            </div>
            <button
                className="apply-leave-button animated-button"
                onClick={() => setShowModal(true)}
            >
                Apply for Leave
            </button>
            {msg && <div className="message">{msg}</div>}
            <LeaveModal
                open={showModal}
                values={form}
                onChange={handleChange}
                onClose={resetForm}
                onSubmit={handleSubmit}
            />
        </section>
    );
}

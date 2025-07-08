import React, { useState } from "react";

export default function DoctorWorkDetails() {
    const [extraHours, setExtraHours] = useState(0);
    const [saturdaysWorked, setSaturdaysWorked] = useState(0);
    const [sundaysWorked, setSundaysWorked] = useState(0);
    const [message, setMessage] = useState("");

    const handleSave = () => {
        setMessage("Work details updated successfully!");
        setTimeout(() => setMessage(""), 3000);
    };

    return (
        <section className="doctor-work-details">
            <h2>Update Work Details</h2>
            <div className="work-details-grid">
                <div className="detail-item">
                    <label>
                        Extra Working Hours (per week):
                        <input
                            type="number"
                            min="0"
                            max="40"
                            value={extraHours}
                            onChange={(e) => setExtraHours(Number(e.target.value))}
                        />
                    </label>
                </div>
                <div className="detail-item">
                    <label>
                        Saturdays Worked (per month):
                        <input
                            type="number"
                            min="0"
                            max="5"
                            value={saturdaysWorked}
                            onChange={(e) => setSaturdaysWorked(Number(e.target.value))}
                        />
                    </label>
                </div>
                <div className="detail-item">
                    <label>
                        Sundays Worked (per month):
                        <input
                            type="number"
                            min="0"
                            max="5"
                            value={sundaysWorked}
                            onChange={(e) => setSundaysWorked(Number(e.target.value))}
                        />
                    </label>
                </div>
            </div>
            <button onClick={handleSave} className="save-button animated-button">
                Save
            </button>
            {message && <div className="message">{message}</div>}
        </section>
    );
}
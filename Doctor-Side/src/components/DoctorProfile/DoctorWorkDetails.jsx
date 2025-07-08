import React, { useState } from "react";

export default function DoctorWorkDetails() {
    const [hours, setHours] = useState(0);
    const [sat, setSat] = useState(0);
    const [sun, setSun] = useState(0);
    const [msg, setMsg] = useState("");

    const saveDetails = () => {
        setMsg("Work details updated successfully!");
        setTimeout(() => setMsg(""), 3000);
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
                            value={hours}
                            onChange={e => setHours(Number(e.target.value))}
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
                            value={sat}
                            onChange={e => setSat(Number(e.target.value))}
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
                            value={sun}
                            onChange={e => setSun(Number(e.target.value))}
                        />
                    </label>
                </div>
            </div>
            <button onClick={saveDetails} className="save-button animated-button">
                Save
            </button>
            {msg && <div className="message">{msg}</div>}
        </section>
    );
}

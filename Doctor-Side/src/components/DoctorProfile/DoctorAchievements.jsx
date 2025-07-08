import React, { useState } from "react";

export default function DoctorAchievements() {
    const [achievements, setAchievements] = useState([
        "Best Doctor Award 2024",
        "1000+ Patients Treated",
        "Published 5+ Research Papers",
        "10+ Years of Medical Experience",
        "Invited Speaker at Global Health Conference 2023",
        "Specialist in Cardiology & Internal Medicine",
        "Achieved 95% Patient Satisfaction Rate",
        "Volunteered in 3+ Medical Camps",
        "Certified in Advanced Trauma Life Support (ATLS)",
        "Trained 50+ Medical Interns",
    ]);

    const [newAchievement, setNewAchievement] = useState("");
    const [message, setMessage] = useState("");

    const handleAddAchievement = () => {
        if (newAchievement.trim() !== "") {
            setAchievements([...achievements, newAchievement.trim()]);
            setNewAchievement("");
            setMessage("Achievement added successfully!");
            setTimeout(() => {
                setMessage("");
            }, 3000);
        } else {
            setMessage("Please enter an achievement.");
            setTimeout(() => {
                setMessage("");
            }, 3000);
        }
    };

    return (
        <section className="doctor-achievements">
            <h2>Achievements & Recognition</h2>
            <div className="achievements-list-container">
                <ul>
                    {achievements.map((item, idx) => (
                        <li key={idx}>{item}</li>
                    ))}
                </ul>
            </div>
            <div className="add-achievement-form">
                <input
                    type="text"
                    value={newAchievement}
                    onChange={(e) => setNewAchievement(e.target.value)}
                    placeholder="Add new achievement"
                />
                <button onClick={handleAddAchievement} className="animated-button">
                    Add
                </button>
            </div>
            {message && <div className="message">{message}</div>}
        </section>
    );
}

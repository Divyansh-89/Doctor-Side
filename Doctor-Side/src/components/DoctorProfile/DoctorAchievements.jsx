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

    const [input, setInput] = useState("");
    const [msg, setMsg] = useState("");

    const addAchievement = () => {
        if (!input.trim()) {
            setMsg("Please enter an achievement.");
            setTimeout(() => setMsg(""), 3000);
            return;
        }
        setAchievements(prev => [...prev, input.trim()]);
        setInput("");
        setMsg("Achievement added successfully!");
        setTimeout(() => setMsg(""), 3000);
    };

    return (
        <section className="doctor-achievements">
            <h2>Achievements & Recognition</h2>
            <div className="achievements-list-container">
                <ul>
                    {achievements.map((ach, i) => (
                        <li key={i}>{ach}</li>
                    ))}
                </ul>
            </div>
            <div className="add-achievement-form">
                <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Add new achievement"
                />
                <button onClick={addAchievement} className="animated-button">
                    Add
                </button>
            </div>
            {msg && <div className="message">{msg}</div>}
        </section>
    );
}

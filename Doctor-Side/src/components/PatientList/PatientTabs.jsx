import React from "react";

export default function PatientTabs({ tabs, activeTab, onTabChange }) {
  return (
    <div className="tabs">
      {tabs.map(t => (
        <button
          key={t.key}
          className={`tab-btn${activeTab === t.key ? " active" : ""}`}
          onClick={() => onTabChange(t.key)}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

import React from "react";

export default function LeaveList({ leaves }) {
  if (!leaves.length) {
    return <p>No upcoming leaves.</p>;
  }
  return (
    <ul>
      {leaves
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
  );
}

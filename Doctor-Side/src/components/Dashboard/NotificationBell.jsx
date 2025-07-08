import React, { useState } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";

function getPersistedDismissed() {
  return JSON.parse(localStorage.getItem("dismissed_doctor_notifications") || "[]");
}

function setPersistedDismissed(arr) {
  localStorage.setItem("dismissed_doctor_notifications", JSON.stringify(arr));
}

export default function DoctorNotificationBell({ appointments = [] }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [dismissed, setDismissed] = useState(getPersistedDismissed());

  React.useEffect(() => {
    setPersistedDismissed(dismissed);
  }, [dismissed]);

  const notifications = appointments.map(a => ({
    id: `appointment-${a.id}`,
    text: `Upcoming: ${a.name} at ${a.formatted_time}${a.isNew ? " (New)" : ""}.`,
  })).filter(n => !dismissed.includes(n.id));

  const handleRead = id => setDismissed(prev => [...prev, id]);

  return (
    <div className="notification-bell-container">
      <div className="notification-bell" onClick={() => setShowNotifications(!showNotifications)}>
        <IoIosNotificationsOutline size={24} />
        {notifications.length > 0 && (
          <span className="notification-count">{notifications.length}</span>
        )}
      </div>

      {showNotifications && (
        <div className="notification-dropdown">
          <h4>Upcoming Appointments</h4>
          <ul>
            {notifications.length === 0 ? (
              <li>No new appointments.</li>
            ) : (
              notifications.map(notif => (
                <li key={notif.id}>
                  {notif.text}
                  <button onClick={() => handleRead(notif.id)}>Mark as Read</button>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

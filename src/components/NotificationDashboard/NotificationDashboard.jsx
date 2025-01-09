import React, { useEffect, useState } from "react";
import { fetchNotifications } from "../../api/serviceApi";
import "./NotificationDashboard.css";

function NotificationDashboard() {
  const [notifications, setNotifications] = useState([]);
  const [filterSeverity, setFilterSeverity] = useState("");

  useEffect(() => {
    let mounted = true;
    async function loadNotifications() {
      const data = await fetchNotifications();
      if (mounted) {
        setNotifications(data);
      }
    }
    loadNotifications();
    return () => {
      mounted = false;
    };
  }, []);

  const filteredNotifications = notifications.filter((notif) => {
    if (!filterSeverity) return true;
    return notif.severity.toLowerCase() === filterSeverity.toLowerCase();
  });

  return (
    <div className="notification-dashboard">
      <h2>Notification Dashboard</h2>
      <div className="filter-bar">
        <label>Filter by Severity: </label>
        <select
          value={filterSeverity}
          onChange={(e) => setFilterSeverity(e.target.value)}
        >
          <option value="">All</option>
          <option value="Critical">Critical</option>
          <option value="Warning">Warning</option>
          <option value="Informational">Informational</option>
        </select>
      </div>

      <ul className="notification-list">
        {filteredNotifications.map((notif) => (
          <li
            key={notif.id}
            className={`notif-item ${notif.severity.toLowerCase()}`}
          >
            <div className="notif-severity">{notif.severity}</div>
            <div className="notif-message">{notif.message}</div>
            <div className="notif-service">Service: {notif.serviceName}</div>
            <div className="notif-timestamp">
              {new Date(notif.timestamp).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NotificationDashboard;

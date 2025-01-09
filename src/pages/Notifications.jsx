import React, { useState } from "react";
import NotificationPanel from "../components/NotificationPanel";

// Sample notifications
const sampleNotifications = [
  {
    id: "1",
    serviceId: "3",
    severity: "critical",
    message: "Cache Service has stopped unexpectedly",
    timestamp: new Date().toISOString(),
    isRead: false,
  },
  {
    id: "2",
    serviceId: "1",
    severity: "info",
    message: "Web Server performance metrics updated",
    timestamp: new Date().toISOString(),
    isRead: true,
  },
];

function Notifications() {
  const [notifications, setNotifications] = useState(sampleNotifications);

  const handleMarkAsRead = (notificationId) => {
    setNotifications((prev) =>
      prev.map((notification) => {
        if (notification.id === notificationId) {
          return { ...notification, isRead: true };
        }
        return notification;
      })
    );
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Notifications</h1>
      <NotificationPanel
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
      />
    </div>
  );
}

export default Notifications;

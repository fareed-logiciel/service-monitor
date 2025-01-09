import React from "react";
import { Bell, AlertTriangle, Info, AlertCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const NotificationPanel = ({ notifications, onMarkAsRead }) => {
  const severityIcons = {
    critical: <AlertCircle className="text-red-500" size={16} />,
    warning: <AlertTriangle className="text-yellow-500" size={16} />,
    info: <Info className="text-blue-500" size={16} />,
  };

  const severityColors = {
    critical: "bg-red-100 border-red-200",
    warning: "bg-yellow-100 border-yellow-200",
    info: "bg-blue-100 border-blue-200",
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4" id="notifications-panel">
      {/* Header */}
      <div
        className="flex items-center justify-between mb-4"
        id="notifications-header"
      >
        <h2
          className="text-lg font-semibold flex items-center"
          id="notifications-title"
        >
          <Bell className="mr-2" size={20} />
          Notifications
        </h2>
        <span
          id="notifications-new-count"
          className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs"
        >
          {notifications.filter((n) => !n.isRead).length} new
        </span>
      </div>

      {/* Notifications List */}
      <div className="space-y-3" id="notifications-list">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            id={`notification-${notification.id}`} // Unique ID for each notification
            className={`p-3 rounded border ${
              severityColors[notification.severity]
            } ${!notification.isRead ? "border-l-4" : ""}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-2">
                {severityIcons[notification.severity]}
                <div>
                  <p
                    className="text-sm"
                    id={`notification-message-${notification.id}`}
                  >
                    {notification.message}
                  </p>
                  <span
                    className="text-xs text-gray-500"
                    id={`notification-timestamp-${notification.id}`}
                  >
                    {formatDistanceToNow(new Date(notification.timestamp))} ago
                  </span>
                </div>
              </div>
              {!notification.isRead && (
                <button
                  id={`mark-as-read-${notification.id}`} // Unique ID for mark-as-read button
                  onClick={() => onMarkAsRead(notification.id)}
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  Mark as read
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPanel;

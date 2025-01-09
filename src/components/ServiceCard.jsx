import React from "react";
import { Play, Square, AlertTriangle, Clock, RefreshCw } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const ServiceCard = ({ service, onAction }) => {
  const statusIcons = {
    running: <Play className="text-green-500" size={16} />,
    stopped: <Square className="text-red-500" size={16} />,
    disabled: <AlertTriangle className="text-gray-500" size={16} />,
    pending: <Clock className="text-yellow-500" size={16} />,
  };

  const statusColors = {
    running: "bg-green-100 text-green-800",
    stopped: "bg-red-100 text-red-800",
    disabled: "bg-gray-100 text-gray-800",
    pending: "bg-yellow-100 text-yellow-800",
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md p-4"
      id={`service-card-${service.id}`}
    >
      {/* Service Header */}
      <div
        className="flex items-center justify-between mb-2"
        id={`service-header-${service.id}`}
      >
        <div className="flex items-center space-x-2">
          {statusIcons[service.status]}
          <h3 className="font-semibold" id={`service-name-${service.id}`}>
            {service.name}
          </h3>
        </div>
        <span
          id={`service-status-${service.id}`}
          className={`px-2 py-1 rounded-full text-xs ${
            statusColors[service.status]
          }`}
        >
          {service.status}
        </span>
      </div>

      {/* Service Description */}
      <p
        className="text-sm text-gray-600 mb-2"
        id={`service-description-${service.id}`}
      >
        {service.description}
      </p>

      {/* Service Details */}
      <div
        className="text-xs text-gray-500 mb-3"
        id={`service-details-${service.id}`}
      >
        <div id={`service-environment-${service.id}`}>
          Environment: {service.environment}
        </div>
        <div id={`service-platform-${service.id}`}>
          Platform: {service.platform}
        </div>
        <div id={`service-last-updated-${service.id}`}>
          Last updated: {formatDistanceToNow(new Date(service.lastUpdated))} ago
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2" id={`service-actions-${service.id}`}>
        <button
          id={`service-start-${service.id}`}
          onClick={() => onAction("start", service.id)}
          className="px-3 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
          disabled={service.status === "running"}
        >
          Start
        </button>
        <button
          id={`service-stop-${service.id}`}
          onClick={() => onAction("stop", service.id)}
          className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
          disabled={service.status === "stopped"}
        >
          Stop
        </button>
        <button
          id={`service-restart-${service.id}`}
          onClick={() => onAction("restart", service.id)}
          className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
        >
          <RefreshCw size={12} className="mr-1" /> Restart
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;

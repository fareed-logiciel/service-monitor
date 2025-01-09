import React from "react";
import ServiceHistoryChart from "../components/ServiceHistoryChart";

// Sample history data
const sampleHistory = Array.from({ length: 24 }, (_, i) => ({
  timestamp: new Date(Date.now() - (23 - i) * 3600000).toISOString(),
  status: Math.random() > 0.8 ? "stopped" : "running",
  description: "Status change",
}));

function ServiceHistory() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Service History</h1>
      <ServiceHistoryChart history={sampleHistory} />
    </div>
  );
}

export default ServiceHistory;

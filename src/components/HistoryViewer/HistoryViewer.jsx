import React, { useEffect, useState } from "react";
import { fetchServiceHistory } from "../../api/serviceApi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import "./HistoryViewer.css";

function HistoryViewer() {
  const [historyData, setHistoryData] = useState([]);
  const [selectedServiceId, setSelectedServiceId] = useState("1"); // default

  useEffect(() => {
    let mounted = true;
    async function loadHistory() {
      const data = await fetchServiceHistory(selectedServiceId);
      if (mounted) {
        // Convert or transform data for chart usage if needed
        setHistoryData(data);
      }
    }
    loadHistory();
    return () => {
      mounted = false;
    };
  }, [selectedServiceId]);

  // Example transform: create a numeric indicator for states
  // Running = 3, Stopped = 1, Pending = 2, Disabled = 0
  const chartData = historyData.map((record) => {
    let newStateVal;
    switch (record.newState) {
      case "Running":
        newStateVal = 3;
        break;
      case "Pending":
        newStateVal = 2;
        break;
      case "Stopped":
        newStateVal = 1;
        break;
      case "Disabled":
        newStateVal = 0;
        break;
      default:
        newStateVal = 1; // fallback
    }
    return {
      time: new Date(record.timestamp).toLocaleTimeString(),
      stateValue: newStateVal,
      oldState: record.oldState,
      newState: record.newState,
    };
  });

  return (
    <div className="history-viewer">
      <h2>Service History Viewer</h2>
      <div className="service-selector">
        <label>Service ID:</label>
        <input
          type="text"
          value={selectedServiceId}
          onChange={(e) => setSelectedServiceId(e.target.value)}
        />
        {/* In a real app, you might have a dropdown populated by service IDs or names */}
      </div>

      <div className="chart-container">
        <LineChart
          width={600}
          height={300}
          data={chartData}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <Line type="monotone" dataKey="stateValue" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="time" />
          <YAxis
            dataKey="stateValue"
            domain={[0, 3]}
            tickFormatter={(val) => {
              switch (val) {
                case 3:
                  return "Running";
                case 2:
                  return "Pending";
                case 1:
                  return "Stopped";
                case 0:
                  return "Disabled";
                default:
                  return "Unknown";
              }
            }}
          />
          <Tooltip />
        </LineChart>
      </div>

      <table className="history-table">
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Old State</th>
            <th>New State</th>
          </tr>
        </thead>
        <tbody>
          {historyData.map((record, idx) => (
            <tr key={idx}>
              <td>{new Date(record.timestamp).toLocaleString()}</td>
              <td>{record.oldState}</td>
              <td>{record.newState}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HistoryViewer;

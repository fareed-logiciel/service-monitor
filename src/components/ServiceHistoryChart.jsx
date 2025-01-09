import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { format, subDays } from "date-fns";
import { Calendar, Clock, Filter } from "lucide-react";

const statusToNumber = {
  running: 3,
  pending: 2,
  stopped: 1,
  disabled: 0,
};

const statusColors = {
  running: "#22c55e",
  pending: "#eab308",
  stopped: "#ef4444",
  disabled: "#9ca3af",
};

const timeRanges = [
  { label: "Last 24 Hours", value: 1 },
  { label: "Last 7 Days", value: 7 },
  { label: "Last 30 Days", value: 30 },
];

function ServiceHistoryChart({ history }) {
  const [selectedRange, setSelectedRange] = useState(1);
  const [selectedView, setSelectedView] = useState("line");

  const filteredData = history.filter(
    (h) => new Date(h.timestamp) >= subDays(new Date(), selectedRange)
  );

  const data = filteredData.map((h) => ({
    timestamp: format(
      new Date(h.timestamp),
      selectedRange === 1 ? "HH:mm" : "MM/dd HH:mm"
    ),
    value: statusToNumber[h.status],
    status: h.status,
    description: h.description,
    color: statusColors[h.status],
  }));

  const uptimePercentage = (
    (data.filter((d) => d.status === "running").length / data.length) *
    100
  ).toFixed(1);
  const downtimeHours =
    data.filter((d) => d.status === "stopped").length *
    ((selectedRange * 24) / data.length);
  const criticalEvents = data.filter((d) => d.status === "stopped").length;

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div
          id="custom-tooltip"
          className="bg-white p-3 border rounded-lg shadow-lg"
        >
          <p id="tooltip-timestamp" className="text-sm font-semibold mb-1">
            {data.timestamp}
          </p>
          <p className="text-sm flex items-center gap-2">
            <span
              id="tooltip-status"
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: data.color }}
            />
            Status: {data.status}
          </p>
          <p id="tooltip-description" className="text-sm text-gray-600 mt-1">
            {data.description}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md p-4"
      id="service-history-chart"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <h2
          id="history-chart-title"
          className="text-lg font-semibold flex items-center mb-4 sm:mb-0"
        >
          <Clock className="mr-2" size={20} />
          Service Status History
        </h2>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <Calendar size={16} className="text-gray-500" />
            <select
              id="time-range-selector"
              className="pl-2 pr-8 py-1 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedRange}
              onChange={(e) => setSelectedRange(Number(e.target.value))}
            >
              {timeRanges.map((range) => (
                <option
                  id={`time-range-${range.label}`}
                  key={range.value}
                  value={range.value}
                >
                  {range.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <Filter size={16} className="text-gray-500" />
            <select
              id="chart-type-selector"
              className="pl-2 pr-8 py-1 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedView}
              onChange={(e) => setSelectedView(e.target.value)}
            >
              <option id="chart-type-line" value="line">
                Line Chart
              </option>
              <option id="chart-type-bar" value="bar">
                Bar Chart
              </option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div id="uptime-card" className="bg-blue-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600">Uptime</div>
          <div
            id="uptime-percentage"
            className="text-2xl font-bold text-blue-600"
          >
            {uptimePercentage}%
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Last {selectedRange} day(s)
          </div>
        </div>
        <div id="downtime-card" className="bg-red-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600">Downtime</div>
          <div id="downtime-hours" className="text-2xl font-bold text-red-600">
            {downtimeHours.toFixed(1)}h
          </div>
          <div className="text-xs text-gray-500 mt-1">Total hours down</div>
        </div>
        <div id="critical-events-card" className="bg-yellow-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600">Critical Events</div>
          <div
            id="critical-events-count"
            className="text-2xl font-bold text-yellow-600"
          >
            {criticalEvents}
          </div>
          <div className="text-xs text-gray-500 mt-1">Service stops</div>
        </div>
        <div id="current-status-card" className="bg-purple-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600">Current Status</div>
          <div
            id="current-status"
            className="text-2xl font-bold"
            style={{
              color: statusColors[data[data.length - 1]?.status || "disabled"],
            }}
          >
            {data[data.length - 1]?.status || "N/A"}
          </div>
          <div className="text-xs text-gray-500 mt-1">Latest state</div>
        </div>
      </div>

      <div id="chart-container" className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          {selectedView === "line" ? (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="timestamp"
                tick={{ fontSize: 12 }}
                tickLine={{ stroke: "#e5e7eb" }}
              />
              <YAxis
                ticks={[0, 1, 2, 3]}
                tickFormatter={(value) =>
                  Object.entries(statusToNumber).find(
                    ([_, v]) => v === value
                  )?.[0] || ""
                }
                tick={{ fontSize: 12 }}
                tickLine={{ stroke: "#e5e7eb" }}
              />
              <Tooltip content={CustomTooltip} />
              <Line
                type="stepAfter"
                dataKey="value"
                stroke="#4f46e5"
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          ) : (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="timestamp"
                tick={{ fontSize: 12 }}
                tickLine={{ stroke: "#e5e7eb" }}
              />
              <YAxis
                ticks={[0, 1, 2, 3]}
                tickFormatter={(value) =>
                  Object.entries(statusToNumber).find(
                    ([_, v]) => v === value
                  )?.[0] || ""
                }
                tick={{ fontSize: 12 }}
                tickLine={{ stroke: "#e5e7eb" }}
              />
              <Tooltip content={CustomTooltip} />
              <Bar dataKey="value" fill="#4f46e5" radius={[4, 4, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
      <div className="mt-6" id="historical-events-section">
        <div
          className="flex items-center justify-between mb-3"
          id="historical-events-header"
        >
          <h3 className="text-md font-semibold" id="historical-events-title">
            Historical Events
          </h3>
          <div className="flex gap-4" id="status-legend">
            {Object.entries(statusColors).map(([status, color]) => (
              <div
                key={status}
                id={`legend-${status}`}
                className="flex items-center gap-1 text-xs text-gray-600"
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: color }}
                />
                {status}
              </div>
            ))}
          </div>
        </div>
        <div
          className="space-y-2 max-h-48 overflow-y-auto"
          id="historical-events-list"
        >
          {data
            .slice()
            .reverse()
            .map((event, index) => (
              <div
                key={index}
                id={`historical-event-${index}`}
                className="flex items-center justify-between text-sm p-2 hover:bg-gray-50 rounded border border-gray-100"
              >
                <div className="flex items-center space-x-2">
                  <span
                    id={`event-status-color-${index}`}
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: event.color }}
                  />
                  <span id={`event-status-${index}`} className="font-medium">
                    {event.status}
                  </span>
                  <span className="text-gray-600">-</span>
                  <span
                    id={`event-description-${index}`}
                    className="text-gray-600"
                  >
                    {event.description}
                  </span>
                </div>
                <div id={`event-timestamp-${index}`} className="text-gray-500">
                  {event.timestamp}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ServiceHistoryChart;

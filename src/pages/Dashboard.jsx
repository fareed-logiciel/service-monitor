import React, { useState } from "react";
import ServiceCard from "../components/ServiceCard";
import { Search, Filter } from "lucide-react";

// Sample data
const sampleServices = [
  {
    id: "1",
    name: "Web Server",
    status: "running",
    environment: "production",
    platform: "linux",
    lastUpdated: new Date().toISOString(),
    uptime: 86400,
    description: "Main web server handling HTTP requests",
  },
  {
    id: "2",
    name: "Database Service",
    status: "running",
    environment: "production",
    platform: "linux",
    lastUpdated: new Date().toISOString(),
    uptime: 172800,
    description: "Primary database service",
  },
  {
    id: "3",
    name: "Cache Service",
    status: "stopped",
    environment: "development",
    platform: "windows",
    lastUpdated: new Date().toISOString(),
    uptime: 0,
    description: "Redis cache service",
  },
];

function Dashboard() {
  const [services, setServices] = useState(sampleServices);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEnvironment, setSelectedEnvironment] = useState("all");

  const handleServiceAction = (action, serviceId) => {
    setServices((prev) =>
      prev.map((service) => {
        if (service.id === serviceId) {
          return {
            ...service,
            status: action === "stop" ? "stopped" : "running",
            lastUpdated: new Date().toISOString(),
          };
        }
        return service;
      })
    );
  };

  const filteredServices = services.filter((service) => {
    const matchesSearch = service.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesEnvironment =
      selectedEnvironment === "all" ||
      service.environment === selectedEnvironment;
    return matchesSearch && matchesEnvironment;
  });

  return (
    <div id="dashboard-page">
      <h1 id="dashboard-title" className="text-3xl font-bold mb-8">
        Service Dashboard
      </h1>

      <div
        id="dashboard-controls"
        className="mb-6 flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1" id="search-container">
          <Search
            id="search-icon"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            id="search-services"
            placeholder="Search services..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative" id="filter-container">
          <Filter
            id="filter-icon"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <select
            id="select-env"
            className="pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedEnvironment}
            onChange={(e) => setSelectedEnvironment(e.target.value)}
          >
            <option id="all-env" value="all">
              All Environments
            </option>
            <option id="dev" value="development">
              Development
            </option>
            <option id="qa" value="qa">
              QA
            </option>
            <option id="prod" value="production">
              Production
            </option>
          </select>
        </div>
      </div>

      <div id="services-grid" className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredServices.map((service) => (
          <ServiceCard
            key={service.id}
            id={`service-card-${service.id}`}
            service={service}
            onAction={handleServiceAction}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;

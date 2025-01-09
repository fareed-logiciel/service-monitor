import React, { useEffect, useState } from "react";
import { fetchServices, performServiceAction } from "../../api/serviceApi";
import "./ServiceDashboard.css";

function ServiceDashboard() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    let mounted = true;
    async function loadServices() {
      try {
        setLoading(true);
        const data = await fetchServices();
        if (mounted) {
          setServices(data);
        }
      } finally {
        setLoading(false);
      }
    }
    loadServices();
    return () => {
      mounted = false;
    };
  }, []);

  const handleAction = async (serviceId, action) => {
    const response = await performServiceAction(serviceId, action);
    alert(response.message); // Simple alert; replace with a better notification

    // Refresh the services after the action
    const updatedData = await fetchServices();
    setServices(updatedData);
  };

  // Basic filtering by service name or environment
  const filteredServices = services.filter((svc) => {
    const text = filterText.toLowerCase();
    return (
      svc.name.toLowerCase().includes(text) ||
      svc.environment.toLowerCase().includes(text) ||
      svc.status.toLowerCase().includes(text)
    );
  });

  return (
    <div className="service-dashboard">
      <h2>Service State Dashboard</h2>
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Filter by service name, environment, or status"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
      </div>

      {loading ? (
        <p>Loading services...</p>
      ) : (
        <table className="service-table">
          <thead>
            <tr>
              <th>Service Name</th>
              <th>Status</th>
              <th>Environment</th>
              <th>Last Update</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredServices.map((svc) => (
              <tr key={svc.id}>
                <td>{svc.name}</td>
                <td>{svc.status}</td>
                <td>{svc.environment}</td>
                <td>{new Date(svc.lastUpdate).toLocaleString()}</td>
                <td>
                  <button onClick={() => handleAction(svc.id, "start")}>
                    Start
                  </button>
                  <button onClick={() => handleAction(svc.id, "stop")}>
                    Stop
                  </button>
                  <button onClick={() => handleAction(svc.id, "restart")}>
                    Restart
                  </button>
                  <button onClick={() => handleAction(svc.id, "disable")}>
                    Disable
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ServiceDashboard;

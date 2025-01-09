// ServiceDashboard.jsx
import React, { useEffect, useState } from "react";
import { fetchServices, performServiceAction } from "../../api/serviceApi";
import {
  Box,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Stack,
} from "@mui/material";

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
    alert(response.message); // Or replace with MUI Snackbar/Alert

    // Refresh the services after the action
    const updatedData = await fetchServices();
    setServices(updatedData);
  };

  // Basic filtering
  const filteredServices = services.filter((svc) => {
    const text = filterText.toLowerCase();
    return (
      svc.name.toLowerCase().includes(text) ||
      svc.environment.toLowerCase().includes(text) ||
      svc.status.toLowerCase().includes(text)
    );
  });

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Service State Dashboard
      </Typography>

      <Box sx={{ mb: 2 }}>
        <TextField
          label="Filter by service/environment/status"
          variant="outlined"
          size="small"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
      </Box>

      {loading ? (
        <Typography>Loading services...</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Service Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Status</strong>
                </TableCell>
                <TableCell>
                  <strong>Environment</strong>
                </TableCell>
                <TableCell>
                  <strong>Last Update</strong>
                </TableCell>
                <TableCell>
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredServices.map((svc) => (
                <TableRow key={svc.id}>
                  <TableCell>{svc.name}</TableCell>
                  <TableCell>{svc.status}</TableCell>
                  <TableCell>{svc.environment}</TableCell>
                  <TableCell>
                    {new Date(svc.lastUpdate).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleAction(svc.id, "start")}
                      >
                        Start
                      </Button>
                      <Button
                        variant="contained"
                        color="warning"
                        size="small"
                        onClick={() => handleAction(svc.id, "stop")}
                      >
                        Stop
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={() => handleAction(svc.id, "restart")}
                      >
                        Restart
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => handleAction(svc.id, "disable")}
                      >
                        Disable
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

export default ServiceDashboard;

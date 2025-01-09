// NotificationDashboard.jsx
import React, { useEffect, useState } from "react";
import { fetchNotifications } from "../../api/serviceApi";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  List,
  ListItem,
  Alert,
  AlertTitle,
  FormControl,
  InputLabel,
} from "@mui/material";

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

  const getAlertColor = (severity) => {
    switch (severity.toLowerCase()) {
      case "critical":
        return "error";
      case "warning":
        return "warning";
      case "informational":
        return "info";
      default:
        return "info";
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Notification Dashboard
      </Typography>

      <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 2 }}>
        <FormControl size="small">
          <InputLabel id="severity-label">Severity</InputLabel>
          <Select
            labelId="severity-label"
            label="Severity"
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
            sx={{ width: 150 }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Critical">Critical</MenuItem>
            <MenuItem value="Warning">Warning</MenuItem>
            <MenuItem value="Informational">Informational</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <List>
        {filteredNotifications.map((notif) => (
          <ListItem key={notif.id}>
            <Alert
              severity={getAlertColor(notif.severity)}
              variant="outlined"
              sx={{ width: "100%" }}
            >
              <AlertTitle>{notif.severity}</AlertTitle>
              <strong>Service: {notif.serviceName}</strong> — {notif.message}
              <br />
              <em>{new Date(notif.timestamp).toLocaleString()}</em>
            </Alert>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default NotificationDashboard;

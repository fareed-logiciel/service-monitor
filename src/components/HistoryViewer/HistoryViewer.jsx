// HistoryViewer.jsx
import React, { useEffect, useState } from "react";
import { fetchServiceHistory } from "../../api/serviceApi";
import {
  Box,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Paper,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function HistoryViewer() {
  const [historyData, setHistoryData] = useState([]);
  const [selectedServiceId, setSelectedServiceId] = useState("1");

  useEffect(() => {
    let mounted = true;
    async function loadHistory() {
      const data = await fetchServiceHistory(selectedServiceId);
      if (mounted) {
        setHistoryData(data);
      }
    }
    loadHistory();
    return () => {
      mounted = false;
    };
  }, [selectedServiceId]);

  // Transform for chart usage
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
        newStateVal = 1;
    }
    return {
      time: new Date(record.timestamp).toLocaleTimeString(),
      stateValue: newStateVal,
      oldState: record.oldState,
      newState: record.newState,
    };
  });

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Service History Viewer
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Typography variant="body1">Service ID:</Typography>
        <TextField
          size="small"
          value={selectedServiceId}
          onChange={(e) => setSelectedServiceId(e.target.value)}
          sx={{ ml: 1 }}
        />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
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
      </Box>

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Timestamp</strong>
              </TableCell>
              <TableCell>
                <strong>Old State</strong>
              </TableCell>
              <TableCell>
                <strong>New State</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {historyData.map((record, idx) => (
              <TableRow key={idx}>
                <TableCell>
                  {new Date(record.timestamp).toLocaleString()}
                </TableCell>
                <TableCell>{record.oldState}</TableCell>
                <TableCell>{record.newState}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default HistoryViewer;

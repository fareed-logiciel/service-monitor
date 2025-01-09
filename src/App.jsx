// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ServiceDashboard from "./components/ServiceDashboard/ServiceDashboard";
import HistoryViewer from "./components/HistoryViewer/HistoryViewer";
import NotificationDashboard from "./components/NotificationDashboard/NotificationDashboard";
import NavBar from "./components/Shared/NavBar";
import ProtectedRoute from "./components/Shared/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import { Box } from "@mui/material";

function App() {
  return (
    <Router>
      <NavBar />
      <Box sx={{ mt: 2 }}>
        {" "}
        {/* Some spacing under the AppBar */}
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <ServiceDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <HistoryViewer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <NotificationDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;

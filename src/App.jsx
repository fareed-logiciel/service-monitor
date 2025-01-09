import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ServiceDashboard from "./components/ServiceDashboard/ServiceDashboard";
import HistoryViewer from "./components/HistoryViewer/HistoryViewer";
import NotificationDashboard from "./components/NotificationDashboard/NotificationDashboard";
import NavBar from "./components/Shared/NavBar";
import ProtectedRoute from "./components/Shared/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Router>
      <div>
        {/* NavBar could also be conditionally rendered if we only want to show it after login */}
        <NavBar />

        <Routes>
          {/* Protected Routes */}
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

          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />

          {/* Catch-all for non-existent routes */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

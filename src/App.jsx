import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import ServiceHistory from "./pages/ServiceHistory";
import Notifications from "./pages/Notifications";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected Routes */}
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="history"
          element={
            <ProtectedRoute>
              <ServiceHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;

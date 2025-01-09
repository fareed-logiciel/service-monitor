// NavBar.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css"; // optional for styling

function NavBar() {
  return (
    <nav className="navbar">
      <Link to="/">Service Dashboard</Link>
      <Link to="/history">History Viewer</Link>
      <Link to="/notifications">Notifications</Link>
    </nav>
  );
}

export default NavBar;

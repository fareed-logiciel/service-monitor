import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, History, Bell, User } from "lucide-react";

function Layout() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { to: "/", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/history", icon: History, label: "History" },
    { to: "/notifications", icon: Bell, label: "Notifications" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Clear the auth token
    navigate("/login"); // Redirect to login
  };

  return (
    <div className="min-h-screen bg-gray-100 flex" id="layout">
      {/* Sidebar */}
      <nav className="w-64 bg-white shadow-md" id="sidebar">
        <div className="p-4" id="sidebar-header">
          <h1 className="text-xl font-bold text-gray-800" id="sidebar-title">
            Service Monitor
          </h1>
        </div>
        <div className="space-y-2 p-4" id="nav-items">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              id={`nav-${label.toLowerCase().replace(" ", "-")}`} // Unique IDs for nav items
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`
              }
            >
              <Icon size={20} />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header
          className="bg-white shadow px-8 py-4 flex items-center justify-between"
          id="header"
        >
          <div id="header-placeholder"></div>
          {/* Profile Badge */}
          <div className="relative" id="profile-section">
            <button
              id="profile-btn"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="flex items-center space-x-3 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full transition"
            >
              <img
                src="https://via.placeholder.com/40"
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
                id="profile-avatar"
              />
              <span className="text-gray-700 font-medium" id="profile-name">
                John Doe
              </span>
              <User size={20} className="text-gray-500" />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-lg py-2"
                id="dropdown-menu"
              >
                <button
                  id="logout-btn"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Outlet for Nested Routes */}
        <main className="flex-1 p-8" id="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;

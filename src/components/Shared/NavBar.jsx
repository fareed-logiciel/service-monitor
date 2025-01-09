// NavBar.jsx
import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        {/* 
          Typically you'd use MUI's <Button component={Link} to="/path"> 
          But here, let's illustrate a simple approach 
        */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Service Monitor
        </Typography>

        <Button color="inherit" component={Link} to="/">
          Dashboard
        </Button>
        <Button color="inherit" component={Link} to="/history">
          History
        </Button>
        <Button color="inherit" component={Link} to="/notifications">
          Notifications
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { AccountCircle, Notifications } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
const EmployeeNavbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");
  const userRole = localStorage.getItem("userRole");
  const handleProfileClick = (event) => setAnchorEl(event.currentTarget);
  const handleProfileMenuClose = () => setAnchorEl(null);
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <AppBar
      position="relative"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        top: "-20%",
        left: "-20px",
        width: "1110px",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">
          {" "}
          {userRole === "admin" ? "Admin Dashboard" : "Employee Dashboard"}
        </Typography>
        <Typography variant="subtitle1" sx={{ marginRight: 2 }}>
          Welcome {userName}
        </Typography>
        <div>
          <IconButton color="inherit" onClick={handleProfileClick}>
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
            <MenuItem>Help</MenuItem>
          </Menu>
          <IconButton color="inherit">
            <Notifications />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default EmployeeNavbar;

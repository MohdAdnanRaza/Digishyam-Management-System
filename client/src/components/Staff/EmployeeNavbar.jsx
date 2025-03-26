import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Badge,
  Avatar,
  Box,
  Tooltip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  AccountCircle,
  Notifications,
  Help,
  Logout,
  Dashboard,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../config";

const EmployeeNavbar = () => {
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");
  const userRole = localStorage.getItem("userRole");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Get user initials for avatar
  const userInitials = userName
    ? userName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  const handleProfileClick = (event) => setProfileAnchorEl(event.currentTarget);
  const handleProfileMenuClose = () => setProfileAnchorEl(null);
  const handleNotificationsClick = (event) =>
    setNotificationsAnchorEl(event.currentTarget);
  const handleNotificationsClose = () => setNotificationsAnchorEl(null);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleHelp = () => {
    // Navigate to help page or open help modal
    navigate("/help");
    handleProfileMenuClose();
  };

  // Mock notifications - in real app these would come from API/context
  const notifications = [
    { id: 1, text: "New task assigned", read: false },
    { id: 2, text: "Meeting tomorrow at 10 AM", read: true },
  ];
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        top: 0,
        left: { xs: 0, md: 255 },
        width: { xs: "100%", md: "calc(100% - 255px)" },
        backgroundColor: "rgb(13 148 136)",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        transition: "width 0.2s, left 0.2s",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: theme.spacing(0, 2),
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Dashboard sx={{ mr: 1, display: { xs: "block", md: "none" } }} />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              display: { xs: isMobile ? "none" : "block", md: "block" },
            }}
          >
            {userRole === "admin" ? "Admin Dashboard" : "Dashboard"}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {!isMobile && (
            <Typography variant="body2" sx={{ mr: 2 }}>
              Welcome,{" "}
              <Box component="span" sx={{ fontWeight: "bold" }}>
                {userName}
              </Box>
            </Typography>
          )}

          <Tooltip title="Notifications">
            <IconButton
              color="inherit"
              onClick={handleNotificationsClick}
              size="large"
              sx={{
                transition: "transform 0.2s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <Badge badgeContent={unreadCount} color="error">
                <Notifications />
              </Badge>
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={notificationsAnchorEl}
            open={Boolean(notificationsAnchorEl)}
            onClose={handleNotificationsClose}
            PaperProps={{
              elevation: 3,
              sx: { width: 280, maxHeight: 320, mt: 1 },
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ p: 2, fontWeight: "bold", borderBottom: "1px solid #eee" }}
            >
              Notifications
            </Typography>
            {notifications.length === 0 ? (
              <MenuItem disabled>No notifications</MenuItem>
            ) : (
              notifications.map((notification) => (
                <MenuItem
                  key={notification.id}
                  onClick={handleNotificationsClose}
                  sx={{
                    opacity: notification.read ? 0.7 : 1,
                    backgroundColor: notification.read
                      ? "inherit"
                      : "rgba(25, 118, 210, 0.08)",
                    "&:hover": {
                      backgroundColor: notification.read
                        ? "rgba(0, 0, 0, 0.04)"
                        : "rgba(25, 118, 210, 0.12)",
                    },
                  }}
                >
                  <Typography variant="body2">{notification.text}</Typography>
                </MenuItem>
              ))
            )}
            {notifications.length > 0 && (
              <Box
                sx={{ p: 1, borderTop: "1px solid #eee", textAlign: "center" }}
              >
                <Typography
                  variant="body2"
                  color="primary"
                  sx={{
                    cursor: "pointer",
                    "&:hover": { textDecoration: "underline" },
                  }}
                  onClick={() => {
                    navigate("/notifications");
                    handleNotificationsClose();
                  }}
                >
                  View all notifications
                </Typography>
              </Box>
            )}
          </Menu>

          <Tooltip title="Profile & Settings">
            <IconButton
              onClick={handleProfileClick}
              size="small"
              sx={{ ml: 1 }}
            >
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: theme.palette.secondary.main,
                  transition: "transform 0.2s",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              >
                {userInitials}
              </Avatar>
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={profileAnchorEl}
            open={Boolean(profileAnchorEl)}
            onClose={handleProfileMenuClose}
            PaperProps={{
              elevation: 3,
              sx: { width: 200, mt: 1 },
            }}
          >
            <Box
              sx={{ p: 2, textAlign: "center", borderBottom: "1px solid #eee" }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                {userName}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ textTransform: "capitalize" }}
              >
                {userRole}
              </Typography>
            </Box>

            <MenuItem
              onClick={() => {
                navigate("profile");
                handleProfileMenuClose();
              }}
              sx={{ py: 1 }}
            >
              <AccountCircle sx={{ mr: 2, fontSize: 20 }} />
              <Typography variant="body2">My Profile</Typography>
            </MenuItem>

            <MenuItem onClick={handleHelp} sx={{ py: 1 }}>
              <Help sx={{ mr: 2, fontSize: 20 }} />
              <Typography variant="body2">Help & Support</Typography>
            </MenuItem>

            <MenuItem
              onClick={handleLogout}
              sx={{ py: 1, color: theme.palette.error.main }}
            >
              <Logout sx={{ mr: 2, fontSize: 20 }} />
              <Typography variant="body2">Logout</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default EmployeeNavbar;

import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import {
  AccountCircle,
  Notifications,
  Close,
  HelpOutline,
  ExitToApp,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import { motion, AnimatePresence } from "framer-motion";
import API_BASE_URL from "../../config";
const NOTIFICATION_HEIGHT = 50;
const NOTIFICATION_GAP = 14;

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#1976d2",
  color: "#ffffff",
  "&:hover": {
    backgroundColor: "#1565c0",
    transform: "scale(1.05)",
    transition: "0.3s ease-in-out",
  },
}));

const notificationColors = [
  "#F0F8FF",
  "#ff7f50",
  "#008080",
  "#1e90ff",
  "#7FFFD4",
];

const NotificationItem = ({ notification, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      style={{
        padding: "12px 16px",
        backgroundColor: notificationColors[index % notificationColors.length],
        color: "#333",
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        marginBottom: "10px",
        cursor: "pointer",
      }}
    >
      <Typography variant="subtitle2" fontWeight="bold">
        {notification.name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {notification.email}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {notification.phone}
      </Typography>
      <Typography variant="body2" color="text.primary">
        {notification.message}
      </Typography>
    </motion.div>
  );
};

const AdminNavbar = () => {
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [openHelpModal, setOpenHelpModal] = useState(false);
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");
  const userRole = localStorage.getItem("userRole");

  const fetchNotifications = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/contact/notifications`);
      const data = await response.json();
      setNotifications(data);
      setUnreadCount(data.length);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleProfileClick = (event) => setProfileAnchorEl(event.currentTarget);
  const handleProfileMenuClose = () => setProfileAnchorEl(null);
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleNotificationIconClick = () =>
    setIsNotificationOpen((prev) => !prev);
  const handleCloseNotifications = () => {
    setUnreadCount(0);
    setIsNotificationOpen(false);
  };

  const handleHelpClick = () => setOpenHelpModal(true);
  const handleCloseHelpModal = () => setOpenHelpModal(false);

  return (
    <AppBar
      position="relative"
      sx={{
        // zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "#00897b", // Teal 600
        top: "-25%",
        left: "-20px",
        width: "1110px",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">
          {userRole === "admin" ? "Dashboard" : "Employee Dashboard"}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            marginRight: -2,
            fontWeight: "bold",
          }}
        >
          Welcome, Digishyam
        </Typography>
        <div>
          <IconButton
            color="inherit"
            onClick={handleProfileClick}
            sx={{ marginLeft: "-8%" }}
          >
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={profileAnchorEl}
            open={Boolean(profileAnchorEl)}
            onClose={handleProfileMenuClose}
          >
            <MenuItem onClick={handleLogout}>
              <ExitToApp sx={{ marginRight: 1 }} /> Logout
            </MenuItem>
            <MenuItem onClick={handleHelpClick}>
              <HelpOutline sx={{ marginRight: 1 }} /> Help
            </MenuItem>
          </Menu>

          <IconButton color="inherit" onClick={handleNotificationIconClick}>
            <Badge
              badgeContent={unreadCount > 0 ? unreadCount : null}
              color="error"
            >
              <Notifications />
            </Badge>
          </IconButton>

          <AnimatePresence>
            {isNotificationOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: "absolute",
                  top: "64px",
                  right: "18px",
                  width: "320px",
                  backgroundColor: "#f8f9fa",
                  borderRadius: "12px",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
                  padding: "10px",
                  maxHeight: "500px",
                  overflowY: "auto",
                  zIndex: 1500,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px",
                    backgroundColor: "#1976d2",
                    borderRadius: "8px",
                  }}
                >
                  <Typography variant="subtitle1" sx={{ color: "#fff" }}>
                    Notifications
                  </Typography>
                  <IconButton size="small" onClick={handleCloseNotifications}>
                    <Close fontSize="small" sx={{ color: "#fff" }} />
                  </IconButton>
                </Box>

                {notifications.length > 0 ? (
                  notifications.map((notification, index) => (
                    <NotificationItem
                      key={index}
                      notification={notification}
                      index={index}
                    />
                  ))
                ) : (
                  <Typography
                    variant="body2"
                    sx={{
                      textAlign: "center",
                      color: "#757575",
                      marginTop: "10px",
                    }}
                  >
                    No new notifications
                  </Typography>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavbar;

// import React, { useState, useEffect } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   IconButton,
//   Badge,
//   Menu,
//   MenuItem,
//   List,
//   ListItem,
//   ListItemText,
//   Box,
//   Divider,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Button,
// } from "@mui/material";
// import { AccountCircle, Notifications, Close } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";

// const AdminNavbar = () => {
//   const [profileAnchorEl, setProfileAnchorEl] = useState(null);
//   const [isNotificationOpen, setIsNotificationOpen] = useState(false);
//   const [notifications, setNotifications] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [openHelpModal, setOpenHelpModal] = useState(false); // Modal open state
//   const navigate = useNavigate();
//   const userName = localStorage.getItem("userName");
//   const userRole = localStorage.getItem("userRole");

//   // Fetch notifications from the backend
//   const fetchNotifications = async () => {
//     try {
//       const response = await fetch(
//         "http://localhost:4000/api/contact/notifications"
//       );
//       const data = await response.json();
//       setNotifications(data);
//       setUnreadCount(data.length); // Assuming all are unread initially
//     } catch (error) {
//       console.error("Error fetching notifications:", error);
//     }
//   };

//   useEffect(() => {
//     fetchNotifications();
//   }, []);

//   // Profile menu handlers
//   const handleProfileClick = (event) => setProfileAnchorEl(event.currentTarget);
//   const handleProfileMenuClose = () => setProfileAnchorEl(null);

//   // Logout handler
//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   // Notifications handler
//   const handleNotificationIconClick = () =>
//     setIsNotificationOpen((prev) => !prev);

//   // Close notifications
//   const handleCloseNotifications = () => {
//     setUnreadCount(0);
//     setIsNotificationOpen(false);
//   };

//   // Help modal handlers
//   const handleHelpClick = () => setOpenHelpModal(true); // Open modal
//   const handleCloseHelpModal = () => setOpenHelpModal(false); // Close modal

//   return (
//     <AppBar
//       position="relative"
//       sx={{
//         zIndex: (theme) => theme.zIndex.drawer + 1,
//         top: "-20%",
//         left: "-20px",
//         width: "1110px",
//       }}
//     >
//       <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
//         <Typography variant="h6">
//           {userRole === "admin" ? "Admin Dashboard" : "Employee Dashboard"}
//         </Typography>
//         <Typography variant="subtitle1" sx={{ marginRight: 2 }}>
//           Welcome {userName}
//         </Typography>
//         <div>
//           {/* Profile Icon */}
//           <IconButton color="inherit" onClick={handleProfileClick}>
//             <AccountCircle />
//           </IconButton>
//           {/* Profile Menu */}
//           <Menu
//             anchorEl={profileAnchorEl}
//             open={Boolean(profileAnchorEl)}
//             onClose={handleProfileMenuClose}
//           >
//             <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
//             <MenuItem onClick={handleLogout}>Logout</MenuItem>
//             <MenuItem onClick={handleHelpClick}>Help</MenuItem>{" "}
//             {/* Help menu item */}
//           </Menu>

//           {/* Notifications Dropdown */}
//           <IconButton color="inherit" onClick={handleNotificationIconClick}>
//             <Badge badgeContent={unreadCount} color="error">
//               <Notifications />
//             </Badge>
//           </IconButton>

//           {isNotificationOpen && (
//             <Box
//               sx={{
//                 position: "absolute",
//                 top: "62px",
//                 right: "18px",
//                 width: "300px",
//                 backgroundColor: "white",
//                 borderRadius: "16px",
//                 boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
//                 zIndex: 1200,
//               }}
//             >
//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   padding: "8px 16px",
//                   backgroundColor: "lightskyblue",
//                   borderTopLeftRadius: "16px",
//                   borderTopRightRadius: "16px",
//                 }}
//               >
//                 <Typography variant="subtitle1" sx={{ color: "black" }}>
//                   Notifications
//                 </Typography>
//                 <IconButton size="small" onClick={handleCloseNotifications}>
//                   <Close fontSize="small" />
//                 </IconButton>
//               </Box>
//               <Divider />
//               {notifications.length > 0 ? (
//                 <List
//                   sx={{
//                     maxHeight: "300px",
//                     overflowY: "auto",
//                   }}
//                 >
//                   {notifications.map((notification, index) => (
//                     <ListItem key={index} divider>
//                       <ListItemText
//                         primary={notification.name}
//                         secondary={notification.message}
//                       />
//                     </ListItem>
//                   ))}
//                 </List>
//               ) : (
//                 <Typography
//                   variant="body2"
//                   sx={{
//                     padding: "16px",
//                     textAlign: "center",
//                     color: "#757575",
//                   }}
//                 >
//                   No new notifications
//                 </Typography>
//               )}
//             </Box>
//           )}
//         </div>
//       </Toolbar>

//       {/* Help Modal */}
//       <Dialog open={openHelpModal} onClose={handleCloseHelpModal}>
//         <DialogTitle>Developer Contact</DialogTitle>
//         <DialogContent>
//           <Typography variant="h6">Name: Mohd Adnan Raza</Typography>
//           <Typography variant="body1">Contact Number: 8194078744</Typography>
//           <Typography variant="body1">
//             Email: adnankhan0704@gmail.com
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseHelpModal} color="primary">
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </AppBar>
//   );
// };

// export default AdminNavbar;
import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Box,
  Divider,
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

// Styled Button with Hover Animation

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#1976d2", // Replace with your custom background color
  color: "#ffffff", // Replace with your custom text color
  "&:hover": {
    backgroundColor: "#1565c0", // Darker shade of blue for hover effect
    transform: "scale(1.05)",
    transition: "0.3s ease-in-out",
  },
}));
const AdminNavbar = () => {
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [openHelpModal, setOpenHelpModal] = useState(false); // Modal open state
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");
  const userRole = localStorage.getItem("userRole");

  // Fetch notifications from the backend
  const fetchNotifications = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/contact/notifications"
      );
      const data = await response.json();
      setNotifications(data);
      setUnreadCount(data.length); // Assuming all are unread initially
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Profile menu handlers
  const handleProfileClick = (event) => setProfileAnchorEl(event.currentTarget);
  const handleProfileMenuClose = () => setProfileAnchorEl(null);

  // Logout handler
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // Notifications handler
  const handleNotificationIconClick = () =>
    setIsNotificationOpen((prev) => !prev);

  // Close notifications
  const handleCloseNotifications = () => {
    setUnreadCount(0);
    setIsNotificationOpen(false);
  };

  // Help modal handlers
  const handleHelpClick = () => setOpenHelpModal(true); // Open modal
  const handleCloseHelpModal = () => setOpenHelpModal(false); // Close modal

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
          {userRole === "admin" ? "Admin Dashboard" : "Employee Dashboard"}
        </Typography>
        <Typography variant="subtitle1" sx={{ marginRight: 2 }}>
          Welcome {userName}
        </Typography>
        <div>
          {/* Profile Icon */}
          <IconButton color="inherit" onClick={handleProfileClick}>
            <AccountCircle />
          </IconButton>
          {/* Profile Menu */}
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

          {/* Notifications Dropdown */}
          <IconButton color="inherit" onClick={handleNotificationIconClick}>
            <Badge badgeContent={unreadCount} color="error">
              <Notifications />
            </Badge>
          </IconButton>

          {isNotificationOpen && (
            <Box
              sx={{
                position: "absolute",
                top: "62px",
                right: "18px",
                width: "300px",
                backgroundColor: "white",
                borderRadius: "16px",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                zIndex: 1200,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 16px",
                  backgroundColor: "lightskyblue",
                  borderTopLeftRadius: "16px",
                  borderTopRightRadius: "16px",
                }}
              >
                <Typography variant="subtitle1" sx={{ color: "black" }}>
                  Notifications
                </Typography>
                <IconButton size="small" onClick={handleCloseNotifications}>
                  <Close fontSize="small" />
                </IconButton>
              </Box>
              <Divider />
              {notifications.length > 0 ? (
                <List
                  sx={{
                    maxHeight: "300px",
                    overflowY: "auto",
                  }}
                >
                  {notifications.map((notification, index) => (
                    <ListItem key={index} divider>
                      <ListItemText
                        primary={notification.name}
                        secondary={notification.message}
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography
                  variant="body2"
                  sx={{
                    padding: "16px",
                    textAlign: "center",
                    color: "#757575",
                  }}
                >
                  No new notifications
                </Typography>
              )}
            </Box>
          )}
        </div>
      </Toolbar>

      {/* Help Modal */}
      <Dialog open={openHelpModal} onClose={handleCloseHelpModal}>
        <DialogTitle>
          <HelpOutline sx={{ marginRight: 1, color: "blue" }} />
          Developer Contact
        </DialogTitle>
        <DialogContent>
          <Typography variant="h6">Name: Mohd Adnan Raza</Typography>
          <Typography variant="body1">Contact Number: 8194078744</Typography>
          <Typography variant="body1">
            Email: adnankhan0704@gmail.com
          </Typography>
        </DialogContent>
        <DialogActions>
          <StyledButton onClick={handleCloseHelpModal}>Close</StyledButton>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
};

export default AdminNavbar;

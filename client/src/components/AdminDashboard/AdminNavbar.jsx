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
// import {
//   AccountCircle,
//   Notifications,
//   Close,
//   HelpOutline,
//   ExitToApp,
// } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import { styled } from "@mui/system";

// // Styled Button with Hover Animation

// const StyledButton = styled(Button)(({ theme }) => ({
//   backgroundColor: "#1976d2", // Replace with your custom background color
//   color: "#ffffff", // Replace with your custom text color
//   "&:hover": {
//     backgroundColor: "#1565c0", // Darker shade of blue for hover effect
//     transform: "scale(1.05)",
//     transition: "0.3s ease-in-out",
//   },
// }));
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
//             <MenuItem onClick={handleLogout}>
//               <ExitToApp sx={{ marginRight: 1 }} /> Logout
//             </MenuItem>
//             <MenuItem onClick={handleHelpClick}>
//               <HelpOutline sx={{ marginRight: 1 }} /> Help
//             </MenuItem>
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
//         <DialogTitle>
//           <HelpOutline sx={{ marginRight: 1, color: "blue" }} />
//           Developer Contact
//         </DialogTitle>
//         <DialogContent>
//           <Typography variant="h6">Name: Mohd Adnan Raza</Typography>
//           <Typography variant="body1">Contact Number: 8194078744</Typography>
//           <Typography variant="body1">
//             Email: adnankhan0704@gmail.com
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <StyledButton onClick={handleCloseHelpModal}>Close</StyledButton>
//         </DialogActions>
//       </Dialog>
//     </AppBar>
//   );
// };

// export default AdminNavbar;
// import React, { useState, useEffect } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   IconButton,
//   Badge,
//   Menu,
//   MenuItem,
//   Box,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Button,
// } from "@mui/material";
// import {
//   AccountCircle,
//   Notifications,
//   Close,
//   HelpOutline,
//   ExitToApp,
// } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import { styled } from "@mui/system";
// import { motion, AnimatePresence } from "framer-motion";

// const NOTIFICATION_HEIGHT = 60;
// const NOTIFICATION_GAP = 8;

// const StyledButton = styled(Button)(({ theme }) => ({
//   backgroundColor: "#1976d2",
//   color: "#ffffff",
//   "&:hover": {
//     backgroundColor: "#1565c0",
//     transform: "scale(1.05)",
//     transition: "0.3s ease-in-out",
//   },
// }));

// const NotificationItem = ({ notification, index, total }) => {
//   const variants = {
//     initial: {
//       opacity: 0,
//       y: 20,
//       scale: 0.8,
//     },
//     animate: {
//       opacity: 1 - index * 0.2,
//       y: -index * (NOTIFICATION_HEIGHT + NOTIFICATION_GAP),
//       scale: 1 - index * 0.05,
//       transition: {
//         type: "spring",
//         stiffness: 500,
//         damping: 30,
//         delay: index * 0.1,
//       },
//     },
//     exit: {
//       opacity: 0,
//       scale: 0.8,
//       transition: {
//         duration: 0.2,
//       },
//     },
//   };

//   return (
//     <motion.div
//       variants={variants}
//       initial="initial"
//       animate="animate"
//       exit="exit"
//       style={{
//         padding: "12px 16px",
//         backgroundColor: "white",
//         color: "black",
//         borderRadius: "8px",
//         boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
//         marginBottom: NOTIFICATION_GAP,
//         position: "absolute",
//         top: 200,
//         zIndex: total - index,
//         cursor: "pointer",
//       }}
//     >
//       <Typography variant="subtitle2">{notification.name}</Typography>
//       <Typography variant="body2" color="text.secondary">
//         {notification.message}
//       </Typography>
//     </motion.div>
//   );
// };

// const AdminNavbar = () => {
//   const [profileAnchorEl, setProfileAnchorEl] = useState(null);
//   const [isNotificationOpen, setIsNotificationOpen] = useState(false);
//   const [notifications, setNotifications] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [openHelpModal, setOpenHelpModal] = useState(false);
//   const navigate = useNavigate();
//   const userName = localStorage.getItem("userName");
//   const userRole = localStorage.getItem("userRole");

//   const fetchNotifications = async () => {
//     try {
//       const response = await fetch(
//         "http://localhost:4000/api/contact/notifications"
//       );
//       const data = await response.json();
//       setNotifications(data);
//       setUnreadCount(data.length);
//     } catch (error) {
//       console.error("Error fetching notifications:", error);
//     }
//   };

//   useEffect(() => {
//     fetchNotifications();
//   }, []);

//   const handleProfileClick = (event) => setProfileAnchorEl(event.currentTarget);
//   const handleProfileMenuClose = () => setProfileAnchorEl(null);
//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   const handleNotificationIconClick = () =>
//     setIsNotificationOpen((prev) => !prev);

//   const handleCloseNotifications = () => {
//     setUnreadCount(0);
//     setIsNotificationOpen(false);
//   };

//   const handleHelpClick = () => setOpenHelpModal(true);
//   const handleCloseHelpModal = () => setOpenHelpModal(false);

//   const notificationStackVariants = {
//     open: {
//       y: 0,
//       transition: {
//         type: "spring",
//         stiffness: 300,
//         damping: 30,
//         staggerChildren: 0.1,
//       },
//     },
//     closed: {
//       y: -20,
//       transition: {
//         type: "spring",
//         stiffness: 300,
//         damping: 30,
//       },
//     },
//   };

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
//           <IconButton color="inherit" onClick={handleProfileClick}>
//             <AccountCircle />
//           </IconButton>
//           <Menu
//             anchorEl={profileAnchorEl}
//             open={Boolean(profileAnchorEl)}
//             onClose={handleProfileMenuClose}
//           >
//             <MenuItem onClick={handleLogout}>
//               <ExitToApp sx={{ marginRight: 1 }} /> Logout
//             </MenuItem>
//             <MenuItem onClick={handleHelpClick}>
//               <HelpOutline sx={{ marginRight: 1 }} /> Help
//             </MenuItem>
//           </Menu>

//           <IconButton color="inherit" onClick={handleNotificationIconClick}>
//             <Badge badgeContent={unreadCount} color="error">
//               <Notifications />
//             </Badge>
//           </IconButton>

//           <AnimatePresence>
//             {isNotificationOpen && (
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.95 }}
//                 transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                 style={{
//                   position: "absolute",
//                   top: "62px",
//                   right: "18px",
//                   width: "300px",
//                   height: "500%",
//                   backgroundColor: "white",
//                   borderRadius: "16px",
//                   boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
//                   zIndex: 1200,
//                   overflow: "hidden",
//                 }}
//               >
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     padding: "8px 16px",
//                     backgroundColor: "lightskyblue",
//                   }}
//                 >
//                   <Typography variant="subtitle1" sx={{ color: "black" }}>
//                     Notifications
//                   </Typography>
//                   <IconButton size="small" onClick={handleCloseNotifications}>
//                     <Close fontSize="small" />
//                   </IconButton>
//                 </Box>

//                 <motion.div
//                   variants={notificationStackVariants}
//                   initial="closed"
//                   animate="open"
//                   style={{
//                     padding: "16px",
//                     maxHeight: "400px",
//                     overflowY: "auto",
//                   }}
//                 >
//                   {notifications.length > 0 ? (
//                     notifications.map((notification, index) => (
//                       <NotificationItem
//                         key={index}
//                         notification={notification}
//                         index={index}
//                         total={notifications.length}
//                       />
//                     ))
//                   ) : (
//                     <Typography
//                       variant="body2"
//                       sx={{
//                         textAlign: "center",
//                         color: "#757575",
//                       }}
//                     >
//                       No new notifications
//                     </Typography>
//                   )}
//                 </motion.div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </Toolbar>

//       <Dialog open={openHelpModal} onClose={handleCloseHelpModal}>
//         <DialogTitle>
//           <HelpOutline sx={{ marginRight: 1, color: "blue" }} />
//           Developer Contact
//         </DialogTitle>
//         <DialogContent>
//           <Typography variant="h6">Name: Mohd Adnan Raza</Typography>
//           <Typography variant="body1">Contact Number: 8194078744</Typography>
//           <Typography variant="body1">
//             Email: adnankhan0704@gmail.com
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <StyledButton onClick={handleCloseHelpModal}>Close</StyledButton>
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

const NOTIFICATION_HEIGHT = 60;
const NOTIFICATION_GAP = 8;

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#1976d2",
  color: "#ffffff",
  "&:hover": {
    backgroundColor: "#1565c0",
    transform: "scale(1.05)",
    transition: "0.3s ease-in-out",
  },
}));

const colors = ["#ffcccc", "#ccffcc", "#ccccff", "#ffffcc", "#ffccff"];

const NotificationItem = ({ notification, index, total }) => {
  const variants = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.8,
    },
    animate: {
      opacity: 1 - index * 0.2,
      y: -index * (NOTIFICATION_HEIGHT + NOTIFICATION_GAP),
      scale: 1 - index * 0.05,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
        delay: index * 0.1,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{
        padding: "12px 16px",
        backgroundColor: colors[index % colors.length],
        color: "black",
        borderRadius: "8px",
        boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
        marginBottom: NOTIFICATION_GAP,
        position: "absolute",
        top: 200,
        zIndex: total - index,
        cursor: "pointer",
        width: "auto",
      }}
    >
      <Typography variant="subtitle2">{notification.name}</Typography>
      <Typography variant="body2" color="text.secondary">
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
      const response = await fetch(
        "http://localhost:4000/api/contact/notifications"
      );
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

  const notificationStackVariants = {
    open: {
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
      },
    },
    closed: {
      y: -20,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
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
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{
                  position: "absolute",
                  top: "64px",
                  right: "18px",
                  width: "300px",
                  maxHeight: "500px",
                  height: "500px",
                  // backgroundColor: "black",
                  backgroundColor: "#3B3B3B",
                  borderRadius: "16px",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                  zIndex: 1200,
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "8px 16px",
                    backgroundColor: "lightskyblue",
                  }}
                >
                  <Typography variant="subtitle1" sx={{ color: "black" }}>
                    Notifications
                  </Typography>
                  <IconButton size="small" onClick={handleCloseNotifications}>
                    <Close fontSize="small" />
                  </IconButton>
                </Box>

                <motion.div
                  variants={notificationStackVariants}
                  initial="closed"
                  animate="open"
                  style={{
                    padding: "16px",
                    maxHeight: "400px",
                    overflowY: "auto",
                  }}
                >
                  {notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                      <NotificationItem
                        key={index}
                        notification={notification}
                        index={index}
                        total={notifications.length}
                      />
                    ))
                  ) : (
                    <Typography
                      variant="body2"
                      sx={{
                        textAlign: "center",
                        color: "#757575",
                      }}
                    >
                      No new notifications
                    </Typography>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Toolbar>

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

import React, { useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import { motion } from "framer-motion";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import Dashboard from "./Dashboard";

const Admin = () => {
  const [selectedPage, setSelectedPage] = useState("");
  const navigate = useNavigate();
  const location = useLocation(); // To get the current path

  const handleSidebarClick = (page) => {
    setSelectedPage(page);
    navigate(`/admin/${page}`); // Navigate to the corresponding route
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* Sidebar */}
      <AdminSidebar selectedPage={selectedPage} onClick={handleSidebarClick} />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 4,
          position: "relative", // Changed to relative for better alignment
          top: 0,
          left: 0,
          ml: 5,
          mt: 111, // Adds a margin-top of 4 units
        }}
      >
        {/* Content below Navbar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Render Dashboard on the /admin route, otherwise Outlet */}
          {location.pathname === "/admin" ? <Dashboard /> : <Outlet />}
        </motion.div>
      </Box>
    </Box>
  );
};

export default Admin;

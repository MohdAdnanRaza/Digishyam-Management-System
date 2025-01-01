// // import React from "react";
// // import { useNavigate } from "react-router-dom";
// // import {
// //   AppBar,
// //   Toolbar,
// //   Button,
// //   Typography,
// //   Container,
// //   Grid,
// //   Box,
// //   IconButton,
// //   Drawer,
// //   List,
// //   ListItem,
// //   ListItemText,
// //   useMediaQuery,
// //   useTheme,
// //   Modal,
// // } from "@mui/material";
// // import MenuIcon from "@mui/icons-material/Menu";
// // import DropdownUI from "./DropdownUI/DropdownUI";

// // const Mainpage = () => {
// //   const navigate = useNavigate();
// //   const theme = useTheme();
// //   const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check if the screen size is small
// //   const [drawerOpen, setDrawerOpen] = React.useState(false);
// //   const [modalOpen, setModalOpen] = React.useState(false); // State for modal visibility

// //   const toggleDrawer = (open) => () => {
// //     setDrawerOpen(open);
// //   };

// //   const handleModalToggle = () => {
// //     setModalOpen((prev) => !prev); // Toggle modal visibility
// //   };

// //   return (
// //     <div>
// //       {/* Navbar */}
// //       <AppBar position="static" color="transparent" elevation={0}>
// //         <Toolbar style={{ justifyContent: "space-between" }}>
// //           <Typography
// //             variant="h6"
// //             style={{ fontWeight: "bold", color: "#0056D2" }}
// //           >
// //             DigiShyam
// //           </Typography>

// //           {/* Mobile Menu */}
// //           {isMobile ? (
// //             <>
// //               <IconButton
// //                 edge="start"
// //                 color="inherit"
// //                 aria-label="menu"
// //                 onClick={toggleDrawer(true)}
// //               >
// //                 <MenuIcon />
// //               </IconButton>
// //               <Drawer
// //                 anchor="right"
// //                 open={drawerOpen}
// //                 onClose={toggleDrawer(false)}
// //               >
// //                 <List>
// //                   <ListItem button onClick={() => navigate("/")}>
// //                     <ListItemText primary="Home" />
// //                   </ListItem>
// //                   <ListItem button onClick={handleModalToggle}>
// //                     <ListItemText primary="Services" />
// //                   </ListItem>
// //                   <ListItem button onClick={() => navigate("/training")}>
// //                     <ListItemText primary="Training" />
// //                   </ListItem>
// //                   <ListItem button onClick={() => navigate("/about")}>
// //                     <ListItemText primary="About Us" />
// //                   </ListItem>
// //                   <ListItem button onClick={() => navigate("/contact")}>
// //                     <ListItemText primary="Contact Us" />
// //                   </ListItem>
// //                   <ListItem button onClick={() => navigate("/login")}>
// //                     <Button variant="outlined" fullWidth>
// //                       Login
// //                     </Button>
// //                   </ListItem>
// //                   <ListItem button onClick={() => navigate("/signup")}>
// //                     <Button
// //                       variant="contained"
// //                       style={{ backgroundColor: "#0056D2", color: "white" }}
// //                       fullWidth
// //                     >
// //                       Sign Up
// //                     </Button>
// //                   </ListItem>
// //                 </List>
// //               </Drawer>
// //             </>
// //           ) : (
// //             // Desktop Menu
// //             <Box style={{ display: "flex", alignItems: "center" }}>
// //               <Button color="inherit" onClick={() => navigate("/")}>
// //                 Home
// //               </Button>
// //               <Button color="inherit" onClick={handleModalToggle}>
// //                 Services
// //               </Button>
// //               <Button color="inherit" onClick={() => navigate("/training")}>
// //                 Training
// //               </Button>
// //               <Button color="inherit" onClick={() => navigate("/about")}>
// //                 About Us
// //               </Button>
// //               <Button color="inherit" onClick={() => navigate("/contact")}>
// //                 Contact Us
// //               </Button>
// //               <Box>
// //                 <Button
// //                   variant="outlined"
// //                   style={{ marginRight: 10 }}
// //                   onClick={() => navigate("/login")}
// //                 >
// //                   Login
// //                 </Button>
// //                 <Button
// //                   variant="contained"
// //                   style={{ backgroundColor: "#0056D2", color: "white" }}
// //                   onClick={() => navigate("/signup")}
// //                 >
// //                   Sign Up
// //                 </Button>
// //               </Box>
// //             </Box>
// //           )}
// //         </Toolbar>
// //       </AppBar>

// //       {/* Header Section */}
// //       <Container
// //         maxWidth="lg"
// //         style={{ marginTop: "50px", textAlign: "center" }}
// //       >
// //         <Typography variant="h3" style={{ fontWeight: "bold" }}>
// //           Best <span style={{ color: "#0056D2" }}>Digital Marketing </span>
// //           Company for growing your business
// //         </Typography>
// //         <Typography
// //           variant="body1"
// //           style={{ marginTop: "20px", color: "gray" }}
// //         >
// //           Delivering the best digital marketing solutions for all your business
// //           needs. Whether you want to boost your online presence, generate
// //           quality leads, or enhance customer engagement, everything is possible
// //           with our cutting-edge digital marketing strategies and tools.
// //         </Typography>
// //         <Box style={{ marginTop: "30px" }}>
// //           <Button
// //             variant="contained"
// //             style={{
// //               backgroundColor: "#0056D2",
// //               color: "white",
// //               marginRight: 10,
// //             }}
// //           >
// //             Get Started Now
// //           </Button>
// //           <Button
// //             variant="outlined"
// //             style={{ borderColor: "#0056D2", color: "#0056D2" }}
// //           >
// //             Explore Demo
// //           </Button>
// //         </Box>
// //       </Container>

// //       {/* Modal for DropdownUI */}
// //       <Modal
// //         open={modalOpen}
// //         onClose={handleModalToggle}
// //         aria-labelledby="services-modal-title"
// //         aria-describedby="services-modal-description"
// //       >
// //         <div
// //           style={{
// //             position: "absolute",
// //             top: "45%",
// //             left: "50%",
// //             width: "80%",
// //             height: "75%",
// //             transform: "translate(-50%, -50%)",
// //             backgroundColor: "white",
// //             padding: "20px",
// //             boxShadow: 24,
// //             borderRadius: "8px",
// //           }}
// //         >
// //           <Typography
// //             id="services-modal-title"
// //             variant="h6"
// //             style={{
// //               marginBottom: "10px",
// //               marginLeft: "40%",
// //               fontSize: "30px",
// //               fontFamily: "bold",
// //             }}
// //           >
// //             Services
// //           </Typography>
// //           <DropdownUI />
// //         </div>
// //       </Modal>

// //       {/* Illustration Section */}
// //       <Container maxWidth="lg" style={{ marginTop: "50px" }}>
// //         <Grid container spacing={3} justifyContent="center">
// //           <Grid item xs={12} sm={6} md={4}>
// //             <img
// //               src="https://via.placeholder.com/200"
// //               alt="Icon"
// //               style={{ width: "60%", borderRadius: "10px" }}
// //             />
// //           </Grid>
// //           <Grid item xs={12} sm={6} md={4}>
// //             <img
// //               src="https://via.placeholder.com/200"
// //               alt="Icon"
// //               style={{ width: "60%", borderRadius: "10px" }}
// //             />
// //           </Grid>
// //           <Grid item xs={12} sm={6} md={4}>
// //             <img
// //               src="https://via.placeholder.com/200"
// //               alt="Icon"
// //               style={{ width: "60%", borderRadius: "10px" }}
// //             />
// //           </Grid>
// //         </Grid>
// //       </Container>
// //     </div>
// //   );
// // };

// // export default Mainpage;
// import React from "react";
// import Navbar from "./Navbar";
// import Header from "./Header";
// import ServicesModal from "./ServicesModal";
// import IllustrationSection from "./IllustrationSection";

// const Mainpage = () => {
//   const [modalOpen, setModalOpen] = React.useState(false);

//   const handleModalToggle = () => setModalOpen((prev) => !prev);

//   return (
//     <div>
//       <Navbar toggleModal={handleModalToggle} />
//       <Header />
//       <ServicesModal open={modalOpen} handleClose={handleModalToggle} />
//       <IllustrationSection />
//     </div>
//   );
// };

// export default Mainpage;
// src/pages/Mainpage.js
import React, { useState } from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import ServicesModal from "./ServicesModal"; // Import the new modal component
import Services from "./Services";
import Banner from "./Banner";
import Footer from "./Footer";

const Mainpage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalToggle = () => {
    setModalOpen((prev) => !prev);
  };

  return (
    <div>
      {/* Navbar */}
      <div
        style={{ position: "absolute", top: "1px", left: "1px", width: "100%" }}
      >
        <Navbar onServicesClick={handleModalToggle} />
      </div>

      {/* Header Section */}
      <Header />

      {/* Services Modal */}
      <ServicesModal open={modalOpen} onClose={handleModalToggle} />
      <div style={{ position: "absolute", top: "80%", left: "1%" }}>
        <Services />
      </div>
      <div style={{ position: "absolute", top: "170%", left: "1%" }}>
        <Banner />
      </div>
      <div style={{ position: "absolute", top: "245%", left: "1%" }}>
        <Footer />
      </div>
    </div>
  );
};

export default Mainpage;

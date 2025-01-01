import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = ({ onServicesClick }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check if the screen size is small
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <AppBar position="static" color="transparent" elevation={3}>
      <Toolbar style={{ justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          style={{ fontWeight: "bold", color: "#0056D2" }}
        >
          DigiShyam
        </Typography>

        {/* Mobile Menu */}
        {isMobile ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              <List>
                <ListItem button onClick={() => navigate("/")}>
                  <ListItemText primary="Home" />
                </ListItem>
                <ListItem button onClick={onServicesClick}>
                  <ListItemText primary="Services" />
                </ListItem>
                <ListItem button onClick={() => navigate("/training")}>
                  <ListItemText primary="Training" />
                </ListItem>
                <ListItem button onClick={() => navigate("/about")}>
                  <ListItemText primary="About Us" />
                </ListItem>
                <ListItem button onClick={() => navigate("/contact")}>
                  <ListItemText primary="Contact Us" />
                </ListItem>
                <ListItem button onClick={() => navigate("/login")}>
                  <Button variant="outlined" fullWidth>
                    Login
                  </Button>
                </ListItem>
                <ListItem button onClick={() => navigate("/signup")}>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#0056D2", color: "white" }}
                    fullWidth
                  >
                    Sign Up
                  </Button>
                </ListItem>
              </List>
            </Drawer>
          </>
        ) : (
          // Desktop Menu
          <Box style={{ display: "flex", alignItems: "center" }}>
            <Button color="inherit" onClick={() => navigate("/")}>
              Home
            </Button>
            <Button color="inherit" onClick={onServicesClick}>
              Services
            </Button>
            <Button color="inherit" onClick={() => navigate("/training")}>
              Training
            </Button>
            <Button color="inherit" onClick={() => navigate("/about")}>
              About Us
            </Button>
            <Button color="inherit" onClick={() => navigate("/contact")}>
              Contact Us
            </Button>
            <Box>
              <Button
                variant="outlined"
                style={{ marginRight: 10 }}
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button
                variant="contained"
                style={{ backgroundColor: "#0056D2", color: "white" }}
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </Button>
            </Box>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

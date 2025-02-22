import { useState } from "react";
import {
  Grid,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TestimonialSection from "./TestimonialSection";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_BASE_URL from "../config"; // Import API base URL

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    role: "client", // Default role
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/api/auth/signup`, formData); // Use API_BASE_URL here
      toast.success("Signup successful!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Grid container sx={{ height: "100vh", backgroundColor: "#f5f5f5" }}>
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            marginTop: "30px",
            height: "80%",
            width: "120%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#eef2f3",
            marginLeft: "10px",
            borderRadius: "10px",
          }}
        >
          <Typography variant="h5">
            <TestimonialSection />
          </Typography>
        </Box>
      </Grid>

      <Grid item xs={12} md={6}>
        <Box
          sx={{
            marginLeft: "130px",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper
            sx={{
              width: "400px",
              padding: "20px",
              textAlign: "center",
              borderRadius: "10px",
              boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography variant="h5" gutterBottom>
              Sign Up
            </Typography>
            <form onSubmit={handleSignup}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                variant="outlined"
                value={formData.name}
                onChange={handleChange}
                required
                sx={{ marginBottom: "15px" }}
              />
              <TextField
                fullWidth
                label="Mobile"
                name="mobile"
                variant="outlined"
                value={formData.mobile}
                onChange={handleChange}
                required
                sx={{ marginBottom: "15px" }}
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                variant="outlined"
                value={formData.email}
                onChange={handleChange}
                required
                sx={{ marginBottom: "15px" }}
              />
              <TextField
                fullWidth
                type="password"
                label="Password"
                name="password"
                variant="outlined"
                value={formData.password}
                onChange={handleChange}
                required
                sx={{ marginBottom: "15px" }}
              />
              <TextField
                select
                fullWidth
                label="Role"
                name="role"
                variant="outlined"
                value={formData.role}
                onChange={handleChange}
                required
                sx={{ marginBottom: "15px" }}
              >
                <MenuItem value="client">Client</MenuItem>
              </TextField>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isLoading}
              >
                {isLoading ? "Signing Up..." : "Sign Up"}
              </Button>
            </form>
          </Paper>
          <ToastContainer />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Signup;

import React, { useEffect, useState } from "react";
import {
  CardContent,
  Typography,
  Avatar,
  Box,
  CircularProgress,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";
import { styled } from "@mui/system";
import { Email, Person, Phone, Work } from "@mui/icons-material";
import Tilt from "react-parallax-tilt";

const GradientCard = styled(Box)(({ theme }) => ({
  maxWidth: 500,
  margin: "40px auto",
  padding: "20px",
  textAlign: "center",
  borderRadius: "20px",
  background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 50%)",
  color: "white",
  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
}));

const AnimatedText = styled(Typography)(({ theme }) => ({
  fontSize: "1.2rem",
  fontWeight: "bold",
  background: "linear-gradient(90deg, #ff8a00, #e52e71)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  animation: "gradientText 3s ease-in-out infinite",
  "@keyframes gradientText": {
    "0%": { backgroundPosition: "0% 50%" },
    "50%": { backgroundPosition: "100% 50%" },
    "100%": { backgroundPosition: "0% 50%" },
  },
}));

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isResetOpen, setIsResetOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/auth/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUserData(data);
        setFormValues({
          name: data.name,
          email: data.email,
          mobile: data.mobile,
        });
      } catch (error) {
        console.error(
          "Error fetching user profile:",
          error.response?.data || error.message
        );
      }
    };

    fetchUserData();
  }, []);

  const handleEditSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put("http://localhost:4000/api/auth/profile", formValues, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserData({ ...userData, ...formValues });
      setIsEditOpen(false);
    } catch (error) {
      console.error("Error updating profile:", error.message);
    }
  };

  const handleResetPassword = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:4000/api/auth/reset-password",
        { password: newPassword },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setIsResetOpen(false);
    } catch (error) {
      console.error("Error resetting password:", error.message);
    }
  };

  if (!userData) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  return (
    <Tilt
      tiltMaxAngleX={10}
      tiltMaxAngleY={10}
      glareEnable
      glareMaxOpacity={0.3}
    >
      <GradientCard>
        <Avatar
          src={userData.photo || "/default-avatar.png"}
          alt="Profile Photo"
          sx={{
            width: 120,
            height: 120,
            margin: "20px auto",
            border: "4px solid white",
          }}
        />
        <AnimatedText variant="h5">Welcome, {userData.name}</AnimatedText>
        <CardContent>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            my={1}
          >
            <Person fontSize="large" sx={{ marginRight: "10px" }} />
            <Typography variant="h6">Name: {userData.name}</Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            my={1}
          >
            <Email fontSize="large" sx={{ marginRight: "10px" }} />
            <Typography variant="h6">Email: {userData.email}</Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            my={1}
          >
            <Phone fontSize="large" sx={{ marginRight: "10px" }} />
            <Typography variant="h6">Mobile: {userData.mobile}</Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            my={1}
          >
            <Work fontSize="large" sx={{ marginRight: "10px" }} />
            <Typography variant="h6">Role: {userData.role}</Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsEditOpen(true)}
            sx={{ margin: "10px" }}
          >
            Edit Profile
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setIsResetOpen(true)}
            sx={{ margin: "10px" }}
          >
            Reset Password
          </Button>
        </CardContent>
      </GradientCard>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onClose={() => setIsEditOpen(false)}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Name"
            value={formValues.name}
            onChange={(e) =>
              setFormValues({ ...formValues, name: e.target.value })
            }
          />
          <TextField
            fullWidth
            margin="dense"
            label="Email"
            value={formValues.email}
            onChange={(e) =>
              setFormValues({ ...formValues, email: e.target.value })
            }
          />
          <TextField
            fullWidth
            margin="dense"
            label="Mobile"
            value={formValues.mobile}
            onChange={(e) =>
              setFormValues({ ...formValues, mobile: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleEditSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Reset Password Dialog */}
      <Dialog open={isResetOpen} onClose={() => setIsResetOpen(false)}>
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            type="password"
            label="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsResetOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleResetPassword} color="primary">
            Reset
          </Button>
        </DialogActions>
      </Dialog>
    </Tilt>
  );
};

export default Profile;

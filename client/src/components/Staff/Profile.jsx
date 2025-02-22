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
import { Email, Person, Phone, Work, CalendarToday } from "@mui/icons-material";
import API_BASE_URL from "../../config";
const StyledCard = styled(Box)(({ theme }) => ({
  maxWidth: 1000,
  margin: "50px auto",
  marginTop: "10%",
  padding: "30px",
  textAlign: "center",
  borderRadius: "20px",
  backgroundColor: "#f0f0f0",
  color: "#4a4a4a",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
  display: "flex",
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
          `http://localhost:4000/api/auth/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUserData(data);
        console.log("Fetched user data:", data); // Log user data here
        console.log("Profile Picture URL:", data.profilePicture);
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
      await axios.put(`http://localhost:4000/api/auth/profile`, formValues, {
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
        `http://localhost:4000/api/auth/reset-password`,
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
        width="100vw"
      >
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  return (
    <div>
      <StyledCard>
        <Avatar
          src={`http://localhost:4000/${userData.profilePicture}`}
          alt="Profile Photo"
          sx={{
            maxWidth: 900,
            width: 450,
            height: 350,
            borderRadius: "8px",
            border: "6px solid black",
            backgroundColor: "#bdbdbd",
          }}
        >
          {!userData.profilePicture && userData.name.charAt(0).toUpperCase()}
        </Avatar>

        <CardContent>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
            my={1}
          >
            <Person fontSize="large" sx={{ marginRight: "10px" }} />
            <Typography variant="h6">Name: {userData.name}</Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
            my={1}
          >
            <Email fontSize="large" sx={{ marginRight: "10px" }} />
            <Typography variant="h6">Email: {userData.email}</Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
            my={1}
          >
            <Phone fontSize="large" sx={{ marginRight: "10px" }} />
            <Typography variant="h6">Mobile: {userData.mobile}</Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
            my={1}
          >
            <Work fontSize="large" sx={{ marginRight: "10px" }} />
            <Typography variant="h6">Role: {userData.role}</Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
            my={1}
          >
            <CalendarToday fontSize="large" sx={{ marginRight: "10px" }} />
            <Typography variant="h6">
              Joining Date:{" "}
              {new Date(userData.joiningDate).toLocaleDateString()}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="flex-start" my={1}>
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
          </Box>
        </CardContent>
      </StyledCard>

      {/* New Introduction Section for Digital Marketer */}

      <div
        style={{
          padding: "50px 20px",
          textAlign: "center",
          maxWidth: "1050px",
        }}
      >
        <h1 className="bg-teal-700 font-bold ">About me</h1>
        <Typography variant="body1" paragraph>
          Our team member, {userData.name}, is an experienced digital marketer
          who plays a key role in shaping our online presence. With a strong
          background in digital strategies, they are adept at using various
          digital channels to market products and services to consumers and
          businesses. Their expertise includes SEO (Search Engine Optimization),
          SEM (Search Engine Marketing), content marketing, social media
          management, and email campaigns.
        </Typography>
        <Typography variant="body1" paragraph>
          {userData.name} is passionate about staying ahead of trends in the
          fast-paced world of digital marketing. By leveraging data and creative
          strategies, they have successfully increased our brand visibility and
          audience engagement. Their commitment to driving results through
          digital innovation has contributed significantly to our business's
          growth and success.
        </Typography>
        <Typography variant="body1" paragraph>
          In addition to their technical skills, {userData.name} is a
          collaborative team player who works closely with other departments to
          ensure that marketing efforts align with business goals. Their ability
          to think strategically and execute effectively makes them an
          invaluable asset to our team.
        </Typography>
      </div>
    </div>
  );
};

export default Profile;

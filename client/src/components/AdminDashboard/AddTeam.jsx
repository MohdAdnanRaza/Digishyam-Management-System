import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Typography,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import { motion } from "framer-motion";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AdminNavbar from "./AdminNavbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_BASE_URL from "../../config";
const AddTeam = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "staff",
  });

  const [team, setTeam] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  // Fetch team data when component mounts
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/auth/team`);
        setTeam(response.data); // Assuming response.data contains an array of team members
      } catch (error) {
        console.error(error);
        toast.error("Error fetching team data");
      }
    };

    fetchTeam();
  }, []); // Empty dependency array ensures this runs once when component mounts

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditing(null);
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "staff",
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        // Update existing member
        const response = await axios.put(
          `http://localhost:4000/api/auth/edit/${editing._id}`,
          formData
        );
        setTeam((prev) =>
          prev.map((member) =>
            member._id === editing._id ? { ...member, ...formData } : member
          )
        );
        toast.success(
          response.data.message || "Team member updated successfully!"
        );
      } else {
        // Add new member
        const response = await axios.post(
          `http://localhost:4000/api/auth/signup`,
          formData
        );
        setTeam((prev) => [...prev, { ...formData, id: response.data._id }]);
        toast.success(
          response.data.message || "Team member added successfully!"
        );
      }
      handleClose();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleEdit = (member) => {
    setEditing(member);
    setFormData(member);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/auth/delete/${id}`);
      setTeam((prev) => prev.filter((member) => member._id !== id));
      toast.success("Team member deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div style={{ position: "absolute", top: "-1147%", left: "-817%" }}>
      <AdminNavbar />
      <div>
        <ToastContainer />
        <Box padding="2rem ">
          <Typography variant="h4" gutterBottom>
            Team Management
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpen}
            sx={{ mb: 3, ml: 95, mt: -10 }}
          >
            Add New Employee
          </Button>

          {/* Team Table */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ backgroundColor: "primary.main" }}>
                <TableRow>
                  <TableCell>Profile</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Mobile Number</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Date of Joining</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {team.map((member) => (
                  <TableRow key={member.id}> */}
                {team
                  .filter((member) => member.role === "staff") // Only show staff
                  .map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <img
                          src={`http://localhost:4000/${member.profilePicture}`}
                          alt="Profile"
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                          }}
                        />
                      </TableCell>
                      <TableCell>{member.name}</TableCell>
                      <TableCell>{member.mobile}</TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell>
                        {new Date(member.joiningDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{member.role}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleEdit(member)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(member._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Modal for Adding/Editing Team Member */}
          <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>
              {editing ? "Edit Team Member" : "Add New Team Member"}
            </DialogTitle>
            <DialogContent>
              <form onSubmit={handleSubmit}>
                <Box mb={2}>
                  <TextField
                    fullWidth
                    label="Name"
                    variant="outlined"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Box>
                <Box mb={2}>
                  <TextField
                    fullWidth
                    label="Mobile Number"
                    variant="outlined"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                  />
                </Box>
                <Box mb={2}>
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Box>
                {!editing && (
                  <Box mb={2}>
                    <TextField
                      fullWidth
                      label="Password"
                      variant="outlined"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </Box>
                )}
                <Box mb={2}>
                  <TextField
                    fullWidth
                    label="Joining Date"
                    variant="outlined"
                    name="joiningDate"
                    type="date"
                    value={formData.joiningDate}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    required
                  />
                </Box>
                <Box mb={3}>
                  <FormControl fullWidth>
                    <InputLabel id="role-label">Role</InputLabel>
                    <Select
                      labelId="role-label"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                    >
                      <MenuItem value="staff">Staff</MenuItem>
                      {/* <MenuItem value="client">Client</MenuItem>
                      <MenuItem value="admin">Admin</MenuItem> */}
                    </Select>
                  </FormControl>
                </Box>
                <Box mb={2}>
                  <Button variant="contained" component="label">
                    Upload Profile Picture
                    <input
                      type="file"
                      hidden
                      onChange={(e) => {
                        const file = e.target.files[0];
                        const formData = new FormData();
                        formData.append("profilePicture", file);
                        axios
                          .post(
                            "http://localhost:4000/api/auth/upload-profile-picture",
                            formData
                          )
                          .then((response) => {
                            setFormData((prev) => ({
                              ...prev,
                              profilePicture: response.data.filePath,
                            }));
                          })
                          .catch((error) => {
                            toast.error("Error uploading profile picture");
                          });
                      }}
                    />
                  </Button>
                </Box>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Button type="submit" variant="contained" color="primary">
                      {editing ? "Update" : "Add"}
                    </Button>
                  </motion.div>
                </DialogActions>
              </form>
            </DialogContent>
          </Dialog>
        </Box>
      </div>
    </div>
  );
};

export default AddTeam;

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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AdminNavbar from "./AdminNavbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_BASE_URL from "../../config";
const AddStudent = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    course: "",
  });
  const [students, setStudents] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/students`);
        setStudents(response.data);
      } catch (error) {
        console.error(error);
        toast.error("Error fetching students");
      }
    };
    fetchStudents();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditing(null);
    setFormData({
      name: "",
      mobile: "",
      email: "",
      course: "",
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(
          `http://localhost:4000/api/students/${editing._id}`,
          formData
        );
        setStudents((prev) =>
          prev.map((student) =>
            student._id === editing._id ? { ...student, ...formData } : student
          )
        );
        toast.success("Student updated successfully!");
      } else {
        const response = await axios.post(
          `http://localhost:4000/api/students`,
          formData
        );
        setStudents((prev) => [
          ...prev,
          { ...formData, id: response.data._id },
        ]);
        toast.success("Student added successfully!");
      }
      handleClose();
    } catch (error) {
      console.error(error);
      toast.error("Error saving student");
    }
  };

  const handleEdit = (student) => {
    setEditing(student);
    setFormData(student);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/students/${id}`);
      setStudents((prev) => prev.filter((student) => student._id !== id));
      toast.success("Student deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Error deleting student");
    }
  };

  return (
    <div style={{ position: "absolute", top: "-1147%", left: "-817%" }}>
      <AdminNavbar />
      <div>
        <Box p={4}>
          <Typography variant="h4" gutterBottom>
            Student Management
          </Typography>
          <Button
            sx={{ mb: 3, ml: 95, mt: -10 }}
            variant="contained"
            color="primary"
            onClick={handleOpen}
          >
            Add New Student
          </Button>
          <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table>
              <TableHead sx={{ backgroundColor: "primary.main" }}>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Mobile</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Course</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student._id}>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.mobile}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.course}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEdit(student)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(student._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>
              {editing ? "Edit Student" : "Add New Student"}
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
                    label="Mobile"
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
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Box>
                <Box mb={3}>
                  <TextField
                    fullWidth
                    label="Course"
                    variant="outlined"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    required
                  />
                </Box>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button type="submit" variant="contained" color="primary">
                    {editing ? "Update" : "Add"}
                  </Button>
                </DialogActions>
              </form>
            </DialogContent>
          </Dialog>
        </Box>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddStudent;

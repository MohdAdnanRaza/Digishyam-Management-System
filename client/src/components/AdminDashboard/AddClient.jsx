// import React, { useState, useEffect } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   TextField,
//   Box,
// } from "@mui/material";
// import axios from "axios";

// const AddClient = () => {
//   const [clients, setClients] = useState([]);
//   const [form, setForm] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     company: "",
//   });

//   const [isEdit, setIsEdit] = useState(false);
//   const [editId, setEditId] = useState(null);

//   // Fetch clients
//   useEffect(() => {
//     fetchClients();
//   }, []);

//   const fetchClients = async () => {
//     try {
//       const response = await axios.get("http://localhost:4000/api/clients");
//       setClients(response.data);
//     } catch (error) {
//       console.error("Error fetching clients:", error);
//     }
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (isEdit) {
//         await axios.put(`http://localhost:4000/api/clients/${editId}`, form);
//         setIsEdit(false);
//         setEditId(null);
//       } else {
//         await axios.post("http://localhost:4000/api/clients", form);
//       }
//       setForm({ name: "", phone: "", email: "", company: "" });
//       fetchClients();
//     } catch (error) {
//       console.error("Error submitting client:", error);
//     }
//   };

//   const handleEdit = (client) => {
//     setForm(client);
//     setIsEdit(true);
//     setEditId(client._id);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:4000/api/clients/${id}`);
//       fetchClients();
//     } catch (error) {
//       console.error("Error deleting client:", error);
//     }
//   };

//   return (
//     <Box p={3}>
//       <h2>Client Management</h2>

//       {/* Add/Edit Client Form */}
//       <form onSubmit={handleSubmit}>
//         <Box display="flex" gap={2} mb={2}>
//           <TextField
//             label="Name"
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             required
//             fullWidth
//           />
//           <TextField
//             label="Phone"
//             name="phone"
//             value={form.phone}
//             onChange={handleChange}
//             required
//             fullWidth
//           />
//           <TextField
//             label="Email"
//             name="email"
//             value={form.email}
//             onChange={handleChange}
//             required
//             fullWidth
//           />
//           <TextField
//             label="Company"
//             name="company"
//             value={form.company}
//             onChange={handleChange}
//             required
//             fullWidth
//           />
//         </Box>
//         <Button variant="contained" color="primary" type="submit">
//           {isEdit ? "Update Client" : "Add Client"}
//         </Button>
//       </form>

//       {/* Client List Table */}
//       <TableContainer component={Paper} sx={{ marginTop: 3 }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Name</TableCell>
//               <TableCell>Phone</TableCell>
//               <TableCell>Email</TableCell>
//               <TableCell>Company</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {clients.map((client) => (
//               <TableRow key={client._id}>
//                 <TableCell>{client.name}</TableCell>
//                 <TableCell>{client.phone}</TableCell>
//                 <TableCell>{client.email}</TableCell>
//                 <TableCell>{client.company}</TableCell>
//                 <TableCell>
//                   <Button
//                     variant="outlined"
//                     color="primary"
//                     onClick={() => handleEdit(client)}
//                     sx={{ marginRight: 1 }}
//                   >
//                     Edit
//                   </Button>
//                   <Button
//                     variant="outlined"
//                     color="secondary"
//                     onClick={() => handleDelete(client._id)}
//                   >
//                     Delete
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// };

// export default AddClient;
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Typography,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
} from "@mui/material";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";

const AddClient = () => {
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
  });
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  // Fetch clients
  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/clients");
      setClients(response.data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await axios.put(`http://localhost:4000/api/clients/${editId}`, form);
        setIsEdit(false);
        setEditId(null);
      } else {
        await axios.post("http://localhost:4000/api/clients", form);
      }
      setForm({ name: "", phone: "", email: "", company: "" });
      fetchClients();
      handleClose();
    } catch (error) {
      console.error("Error submitting client:", error);
    }
  };

  const handleEdit = (client) => {
    setForm(client);
    setIsEdit(true);
    setEditId(client._id);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/clients/${id}`);
      fetchClients();
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };

  const handleOpen = () => {
    setForm({ name: "", phone: "", email: "", company: "" });
    setIsEdit(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ position: "absolute", top: "-1147%", left: "-820%" }}>
      <AdminNavbar />
      <div>
        <Box p={4}>
          <Typography variant="h4" gutterBottom>
            Client Management
          </Typography>
          <Button
            sx={{ mb: 3, ml: 95, mt: -10 }}
            variant="contained"
            color="primary"
            onClick={handleOpen}
          >
            Add New Client
          </Button>
          <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Mobile</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Services</TableCell>
                  <TableCell>Company</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clients.map((client) => (
                  <TableRow key={client._id}>
                    <TableCell>{client.name}</TableCell>
                    <TableCell>{client.mobile}</TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell>{client.service}</TableCell>
                    <TableCell>{client.company}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEdit(client)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(client._id)}
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
              {isEdit ? "Edit Client" : "Add New Client"}
            </DialogTitle>
            <DialogContent>
              <form onSubmit={handleSubmit}>
                <Box mb={2}>
                  <TextField
                    fullWidth
                    label="Name"
                    variant="outlined"
                    name="name"
                    value={form.name}
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
                    value={form.mobile}
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
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </Box>
                <Box mb={3}>
                  <TextField
                    fullWidth
                    label="Service"
                    variant="outlined"
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    required
                  />
                </Box>
                <Box mb={3}>
                  <TextField
                    fullWidth
                    label="Company"
                    variant="outlined"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    required
                  />
                </Box>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button type="submit" variant="contained" color="primary">
                    {isEdit ? "Update" : "Add"}
                  </Button>
                </DialogActions>
              </form>
            </DialogContent>
          </Dialog>
        </Box>
      </div>
    </div>
  );
};

export default AddClient;

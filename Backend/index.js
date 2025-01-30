const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const studentRoutes = require("./routes/studentRoutes");
const clientRoutes = require("./routes/clientRoutes");
const leaveRoutes = require("./routes/leaveRoutes");
const salaryRoutes = require("./routes/salaryRoutes");
const taskRoutes = require("./routes/taskRoutes");
const contactRoutes = require("./routes/contactRoutes");
// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;

// Initialize Express app
const app = express();
app.use(express.json());
// app.use(cors({ origin: "http://localhost:5173" }));
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://digishyam-management-system-frontend.onrender.com",
    ],
  })
);
// MongoDB connection
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/leave", leaveRoutes);
app.use("/api/salary", salaryRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/contact", contactRoutes);
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Backend is running successfully! 🚀");
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

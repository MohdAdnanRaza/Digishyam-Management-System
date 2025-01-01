const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;

// Initialize Express app
const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
connectDB();

// Routes
app.use("/api/auth", authRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

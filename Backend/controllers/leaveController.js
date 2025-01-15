const User = require("../models/User");

const Leave = require("../models/leaveModel");
const addLeave = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const { userId, leaveType, startDate, endDate, reason } = req.body;
    if (!leaveType || !startDate || !endDate || !reason) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required" });
    }
    console.log("Received userId:", userId);
    const user = await User.findById(userId); // Use `findById` for simplicity
    console.log("username is ", user);
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found " });
    }
    const newLeave = new Leave({
      userId: user._id,
      leaveType,
      startDate,
      endDate,
      reason,
    });
    await newLeave.save();
    return res.status(200).json({ success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "leave add server error" });
  }
};

// Endpoint to fetch leaves for the logged-in user
const getLeaves = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, error: "User ID is required" });
    }

    const leaves = await Leave.find({ userId }).sort({ startDate: -1 }); // Sort by most recent leave
    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Server error" });
  }
};

const getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate("userId", "name email"); // Populate user details
    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Server error" });
  }
};

const updateLeaveStatus = async (req, res) => {
  try {
    const { leaveId, status } = req.body;

    if (!leaveId || !status) {
      return res
        .status(400)
        .json({ success: false, error: "Leave ID and status are required" });
    }

    const leave = await Leave.findById(leaveId);
    if (!leave) {
      return res.status(404).json({ success: false, error: "Leave not found" });
    }

    leave.status = status;
    leave.updatedAt = Date.now();
    await leave.save();

    return res.status(200).json({ success: true, leave });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Server error" });
  }
};
module.exports = { addLeave, getLeaves, getAllLeaves, updateLeaveStatus };

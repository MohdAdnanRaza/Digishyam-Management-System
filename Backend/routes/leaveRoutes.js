const express = require("express");
const {
  addLeave,
  getLeaves,
  getAllLeaves,
  updateLeaveStatus,
} = require("../controllers/leaveController.js");
const router = express.Router();

router.post("/add", addLeave);
router.get("/:userId", getLeaves); // Get leaves by userId
router.get("/", getAllLeaves); // Fetch all leaves
router.put("/update-status", updateLeaveStatus); // Update leave status
module.exports = router;

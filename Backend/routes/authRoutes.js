const express = require("express");
const {
  signup,
  login,
  editUser,
  deleteUser,
  getProfile,
} = require("../controllers/authController");
const user = require("../models/User");
const verifyToken = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/signup", signup);
// router.post("/verify-signup", verifyOtpSignup);
router.post("/login", login);
// router.post("/verify-login", verifyOtpLogin);
router.put("/edit/:id", editUser); // Route for editing user
router.delete("/delete/:id", deleteUser); // Route for deleting user
router.get("/team", async (req, res) => {
  try {
    const team = await user.find(); // Fetch all team members from the database
    res.status(200).json(team); // Send the team data as a response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching team data" });
  }
});
router.get("/profile", verifyToken, getProfile);
module.exports = router;

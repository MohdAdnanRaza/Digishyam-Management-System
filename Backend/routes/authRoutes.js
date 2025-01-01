const express = require("express");
const {
  sendOtp,
  loginOtp,
  loginPassword,
  signup,
  verifyOtp,
} = require("../controllers/authController");
const router = express.Router();

router.post("/signup", signup);
router.post("/verify-otp", verifyOtp);
router.post("/send-otp", sendOtp); // To send OTP for login
router.post("/login-otp", loginOtp); // To login using OTP
router.post("/login-password", loginPassword);
module.exports = router;

const bcrypt = require("bcryptjs");
const User = require("../models/User");
const emailTransporter = require("../config/emailTransporter");
const jwt = require("jsonwebtoken");
exports.signup = async (req, res) => {
  try {
    const { name, mobile, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const user = new User({
      name,
      mobile,
      email,
      password: hashedPassword,
      otp,
    });
    await user.save();

    await emailTransporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}`,
    });

    res.json({ success: true, message: "OTP sent" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error during signup",
      error: err.message,
    });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { mobile, otp } = req.body;
    const user = await User.findOne({ mobile });

    if (user && user.otp === otp) {
      user.otp = null;
      await user.save();
      res.json({ success: true, message: "OTP verified" });
    } else {
      res.status(400).json({ success: false, message: "Invalid OTP" });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error during OTP verification",
      error: err.message,
    });
  }
};
// Send OTP to user's mobile number
exports.sendOtp = async (req, res) => {
  try {
    const { mobile } = req.body;
    const user = await User.findOne({ mobile });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    await user.save();

    // Send OTP to user (you can integrate an SMS service here)
    await emailTransporter.sendMail({
      from: process.env.EMAIL,
      to: user.email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}`,
    });

    res.json({ success: true, message: "OTP sent successfully" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error sending OTP",
      error: err.message,
    });
  }
};

// Login with OTP
exports.loginOtp = async (req, res) => {
  try {
    const { mobile, otp } = req.body;
    const user = await User.findOne({ mobile });

    if (!user || user.otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    user.otp = null; // OTP used, so set it to null
    await user.save();

    // Generate JWT Token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ success: true, message: "Login successful", token });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error during OTP login",
      error: err.message,
    });
  }
};

// Login with password
exports.loginPassword = async (req, res) => {
  try {
    const { mobile, password } = req.body;
    const user = await User.findOne({ mobile });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ success: true, message: "Login successful", token });
  } catch (err) {
    console.error("Error during OTP login:", err);
    res.status(500).json({
      success: false,
      message: "Error during password login",
      error: err.message,
    });
  }
};

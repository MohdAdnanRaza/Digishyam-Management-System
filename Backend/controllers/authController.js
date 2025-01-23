const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("../models/User");
const User = require("../models/User");

//Register api
const signup = async (req, res) => {
  try {
    const { name, email, mobile, password, role, joiningDate, profilePicture } =
      req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      mobile,
      password: hashedPassword,
      role,
      joiningDate,
      profilePicture,
    });
    await newUser.save();
    res.status(201).json({ message: `User registered with name $(name)` });
  } catch (err) {
    res.status(500).json({ message: `Something went wrong` });
  }
};

//Login api

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const Users = await user.findOne({ email });
    if (!Users) {
      return res
        .status(404)
        .json({ message: `user with name ${email} not found` });
    }
    const isMatch = await bcrypt.compare(password, Users.password);
    if (!isMatch) {
      return res.status(400).json({ message: `Invalid credentials` });
    }
    const token = jwt.sign(
      { id: Users._id, role: Users.role, name: Users.name },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
// Edit User
const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const { name, mobile, email, role } = req.body;

    const validRoles = ["staff", "client", "admin"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role value" });
    }

    const updatedUser = await user.findByIdAndUpdate(
      id,
      { name, mobile, email, role },
      { new: true } // Returns the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await user.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
};
const getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming `req.user` contains decoded token info
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching profile", error: error.message });
  }
};
module.exports = {
  getProfile,
  signup,
  login,
  editUser,
  deleteUser,
};

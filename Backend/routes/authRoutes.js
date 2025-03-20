// const express = require("express");
// const {
//   signup,
//   login,
//   editUser,
//   deleteUser,
//   getProfile,
// } = require("../controllers/authController");
// const user = require("../models/User");
// const verifyToken = require("../middlewares/authMiddleware");
// const router = express.Router();
// const multer = require("multer");
// // Set up storage configuration for multer
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // Specify the folder where files will be uploaded
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname); // Generate a unique file name
//   },
// });

// // Initialize multer with the storage configuration
// const upload = multer({ storage });

// // Route for uploading profile picture
// router.post(
//   "/upload-profile-picture",
//   upload.single("profilePicture"),
//   (req, res) => {
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }
//     // Return the file path of the uploaded image
//     res.status(200).json({ filePath: req.file.path });
//   }
// );
// router.post("/signup", signup);
// // router.post("/verify-signup", verifyOtpSignup);
// router.post("/login", login);
// // router.post("/verify-login", verifyOtpLogin);
// router.put("/edit/:id", editUser); // Route for editing user
// router.delete("/delete/:id", deleteUser); // Route for deleting user
// router.get("/team", async (req, res) => {
//   try {
//     const team = await user.find(); // Fetch all team members from the database
//     res.status(200).json(team); // Send the team data as a response
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error fetching team data" });
//   }
// });
// router.get("/profile", verifyToken, getProfile);
// module.exports = router;
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
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

// Upload profile picture
router.post(
  "/upload-profile-picture",
  upload.single("profilePicture"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    res.status(200).json({ filePath: req.file.path });
  }
);

router.post("/signup", signup);
router.post("/login", login);
router.put("/edit/:id", editUser);
router.delete("/delete/:id", deleteUser);
router.get("/profile", verifyToken, getProfile);

// Fetch all team members
router.get("/team", async (req, res) => {
  try {
    const team = await user.find();
    res.status(200).json(team);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching team data" });
  }
});

module.exports = router;

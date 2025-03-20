const multer = require("multer");
const path = require("path");

// Configure storage for different file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "attachments") {
      cb(null, "uploads/reports/");
    } else if (file.fieldname === "profilePicture") {
      cb(null, "uploads/profiles/");
    } else {
      cb(null, "uploads/"); // Default folder
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// File filter to allow only certain types
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};

// Initialize Multer
const upload = multer({ storage, fileFilter });

module.exports = upload;

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "staff", "client"],
      default: "client",
    },

    joiningDate: { type: Date, required: false }, // New field for joining date
    profilePicture: { type: String }, // New field for profile picture URL
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);

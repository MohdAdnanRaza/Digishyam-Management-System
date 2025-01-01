const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  email: String,
  password: String,
  role: { type: String, default: "client" },
  otp: String,
});

module.exports = mongoose.model("User", UserSchema);

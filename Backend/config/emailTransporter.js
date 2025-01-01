const nodemailer = require("nodemailer");
require("dotenv").config();

const emailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL, // Your Gmail email address
    pass: process.env.PASSWORD, // Your Gmail App Password (not your main password)
  },
});

module.exports = emailTransporter;

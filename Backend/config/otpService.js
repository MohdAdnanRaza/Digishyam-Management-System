// const twilio = require("twilio");

// const client = twilio(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );

// exports.sendOTP = async (phone, otp) => {
//   try {
//     await client.messages.create({
//       body: `Your OTP is ${otp}`,
//       from: process.env.TWILIO_PHONE_NUMBER,
//       to: phone,
//     });
//     console.log("OTP sent successfully");
//   } catch (err) {
//     console.error("Error sending OTP:", err);
//   }
// };
const otpStore = {}; // Temporary OTP storage (for simplicity)

const generateOtp = (mobile) => {
  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  otpStore[mobile] = otp;
  setTimeout(() => delete otpStore[mobile], 300000); // OTP expires in 5 minutes
  return otp;
};

const validateOtp = (mobile, otp) => otpStore[mobile] === otp;

module.exports = { generateOtp, validateOtp };

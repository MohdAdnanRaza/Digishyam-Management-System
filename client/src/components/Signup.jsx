// // import React, { useState } from "react";
// // import axios from "axios";

// // function Signup() {
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     mobile: "",
// //     email: "",
// //     password: "",
// //     confirmPassword: "",
// //   });

// //   const [otpSent, setOtpSent] = useState(false);
// //   const [otp, setOtp] = useState("");
// //   const [isLoading, setIsLoading] = useState(false);

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (formData.password !== formData.confirmPassword) {
// //       alert("Passwords do not match!");
// //       return;
// //     }

// //     try {
// //       setIsLoading(true);
// //       const response = await axios.post(
// //         "http://localhost:5000/api/auth/signup",
// //         formData
// //       );
// //       setIsLoading(false);
// //       if (response.data.success) {
// //         setOtpSent(true);
// //         alert("OTP sent to your mobile number");
// //       } else {
// //         alert("Failed to send OTP. Please try again.");
// //       }
// //     } catch (error) {
// //       setIsLoading(false);
// //       console.error("Error during signup:", error);
// //       alert("Something went wrong. Please try again.");
// //     }
// //   };

// //   const verifyOtp = async () => {
// //     if (!otp) {
// //       alert("Please enter the OTP");
// //       return;
// //     }

// //     try {
// //       setIsLoading(true);
// //       const response = await axios.post(
// //         "http://localhost:5000/api/auth/verify-otp",
// //         {
// //           mobile: formData.mobile,
// //           otp,
// //         }
// //       );
// //       setIsLoading(false);
// //       if (response.data.success) {
// //         alert("Signup successful!");
// //       } else {
// //         alert("Invalid OTP. Please try again.");
// //       }
// //     } catch (error) {
// //       setIsLoading(false);
// //       console.error("Error verifying OTP:", error);
// //       alert("Something went wrong. Please try again.");
// //     }
// //   };

// //   return (
// //     <div style={{ maxWidth: "400px", margin: "0 auto" }}>
// //       <h2>Signup</h2>
// //       {!otpSent ? (
// //         <form onSubmit={handleSubmit}>
// //           <div>
// //             <input
// //               type="text"
// //               name="name"
// //               placeholder="Name"
// //               value={formData.name}
// //               onChange={handleChange}
// //               required
// //             />
// //           </div>
// //           <div>
// //             <input
// //               type="text"
// //               name="mobile"
// //               placeholder="Mobile"
// //               value={formData.mobile}
// //               onChange={handleChange}
// //               required
// //             />
// //           </div>
// //           <div>
// //             <input
// //               type="email"
// //               name="email"
// //               placeholder="Email"
// //               value={formData.email}
// //               onChange={handleChange}
// //               required
// //             />
// //           </div>
// //           <div>
// //             <input
// //               type="password"
// //               name="password"
// //               placeholder="Password"
// //               value={formData.password}
// //               onChange={handleChange}
// //               required
// //             />
// //           </div>
// //           <div>
// //             <input
// //               type="password"
// //               name="confirmPassword"
// //               placeholder="Confirm Password"
// //               value={formData.confirmPassword}
// //               onChange={handleChange}
// //               required
// //             />
// //           </div>
// //           <button type="submit" disabled={isLoading}>
// //             {isLoading ? "Sending OTP..." : "Send OTP"}
// //           </button>
// //         </form>
// //       ) : (
// //         <div>
// //           <input
// //             type="text"
// //             placeholder="Enter OTP"
// //             value={otp}
// //             onChange={(e) => setOtp(e.target.value)}
// //             required
// //           />
// //           <button onClick={verifyOtp} disabled={isLoading}>
// //             {isLoading ? "Verifying..." : "Verify OTP"}
// //           </button>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default Signup;
// import React, { useState } from "react";
// import axios from "axios";
// import {
//   TextField,
//   Button,
//   Typography,
//   Box,
//   CircularProgress,
//   Paper,
//   Tabs,
//   Tab,
// } from "@mui/material";
// import { makeStyles } from "@mui/styles";
// import TestimonialSection from "./TestimonialSection";

// const useStyles = makeStyles({
//   root: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     height: "80vh",
//     backgroundColor: "#f5f5f5",
//   },
//   container: {
//     width: "400px",
//     padding: "20px",
//     textAlign: "center",
//     backgroundColor: "#fff",
//     borderRadius: "10px",

//     boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)",
//   },
//   logo: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: "20px",
//   },
//   tabContainer: {
//     marginBottom: "20px",
//   },
//   input: {
//     marginBottom: "15px",
//   },
//   otpContainer: {
//     marginTop: "20px",
//   },
// });

// function Signup() {
//   const classes = useStyles();
//   const [formData, setFormData] = useState({
//     name: "",
//     mobile: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [otpSent, setOtpSent] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [tab, setTab] = useState(0);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleTabChange = (event, newValue) => {
//     setTab(newValue);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (formData.password !== formData.confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }

//     try {
//       setIsLoading(true);
//       const response = await axios.post(
//         "http://localhost:5000/api/auth/signup",
//         formData
//       );
//       setIsLoading(false);
//       if (response.data.success) {
//         setOtpSent(true);
//         alert("OTP sent to your mobile number");
//       } else {
//         alert("Failed to send OTP. Please try again.");
//       }
//     } catch (error) {
//       setIsLoading(false);
//       console.error("Error during signup:", error);
//       alert("Something went wrong. Please try again.");
//     }
//   };

//   const verifyOtp = async () => {
//     if (!otp) {
//       alert("Please enter the OTP");
//       return;
//     }

//     try {
//       setIsLoading(true);
//       const response = await axios.post(
//         "http://localhost:5000/api/auth/verify-otp",
//         {
//           mobile: formData.mobile,
//           otp,
//         }
//       );
//       setIsLoading(false);
//       if (response.data.success) {
//         alert("Signup successful!");
//       } else {
//         alert("Invalid OTP. Please try again.");
//       }
//     } catch (error) {
//       setIsLoading(false);
//       console.error("Error verifying OTP:", error);
//       alert("Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <div className={classes.root}>
//       <Paper className={classes.container}>
//         <div className={classes.logo}>
//           <img
//             src="https://via.placeholder.com/100"
//             alt="Logo"
//             style={{ borderRadius: "50%" }}
//           />
//         </div>

//         <Typography variant="h5" gutterBottom>
//           Sign Up
//         </Typography>

//         <Tabs
//           value={tab}
//           onChange={handleTabChange}
//           className={classes.tabContainer}
//           centered
//         >
//           <Tab label="Accounting & Billing" />
//           <Tab label="GST Filing" />
//         </Tabs>

//         {!otpSent ? (
//           <form onSubmit={handleSubmit}>
//             <TextField
//               className={classes.input}
//               fullWidth
//               label="Name"
//               name="name"
//               variant="outlined"
//               value={formData.name}
//               onChange={handleChange}
//               required
//             />
//             <TextField
//               className={classes.input}
//               fullWidth
//               label="Mobile"
//               name="mobile"
//               variant="outlined"
//               value={formData.mobile}
//               onChange={handleChange}
//               required
//             />
//             <TextField
//               className={classes.input}
//               fullWidth
//               label="Email"
//               name="email"
//               variant="outlined"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//             <TextField
//               className={classes.input}
//               fullWidth
//               type="password"
//               label="Password"
//               name="password"
//               variant="outlined"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//             <TextField
//               className={classes.input}
//               fullWidth
//               type="password"
//               label="Confirm Password"
//               name="confirmPassword"
//               variant="outlined"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               required
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               color="primary"
//               disabled={isLoading}
//             >
//               {isLoading ? <CircularProgress size={24} /> : "Send OTP"}
//             </Button>
//             <div className="register-link">
//               <a href="/login">Already have an account? Login here</a>
//             </div>
//           </form>
//         ) : (
//           <Box className={classes.otpContainer}>
//             <TextField
//               fullWidth
//               label="Enter OTP"
//               variant="outlined"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               required
//             />
//             <Button
//               fullWidth
//               variant="contained"
//               color="primary"
//               onClick={verifyOtp}
//               disabled={isLoading}
//             >
//               {isLoading ? <CircularProgress size={24} /> : "Verify OTP"}
//             </Button>
//             <div className="register-link">
//               <a href="/signup">Don't have an account? Register here</a>
//             </div>
//           </Box>
//         )}
//       </Paper>
//       <TestimonialSection />
//     </div>
//   );
// }

// export default Signup;

import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Paper,
  Tabs,
  Tab,
  Grid,
} from "@mui/material";
import TestimonialSection from "./TestimonialSection";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tab, setTab] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:4000/api/auth/signup",
        formData
      );
      setIsLoading(false);
      if (response.data.success) {
        setOtpSent(true);
        alert("OTP sent to your mobile number");
      } else {
        alert("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error during signup:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const verifyOtp = async () => {
    if (!otp) {
      alert("Please enter the OTP");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:4000/api/auth/verify-otp",
        {
          mobile: formData.mobile,
          otp,
        }
      );
      setIsLoading(false);
      if (response.data.success) {
        alert("Signup successful!");
      } else {
        alert("Invalid OTP. Please try again.");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error verifying OTP:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <Grid container sx={{ height: "100vh", backgroundColor: "#f5f5f5" }}>
      {/* Left Section - Testimonial */}
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            marginTop: "30px",
            height: "80%",
            width: "120%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#eef2f3",
            marginLeft: "10px",
            borderRadius: "10px",
          }}
        >
          <TestimonialSection />
        </Box>
      </Grid>

      {/* Right Section - Signup Form */}
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            marginLeft: "130px",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper
            sx={{
              width: "400px",
              padding: "20px",
              textAlign: "center",
              borderRadius: "10px",
              boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography variant="h5" gutterBottom>
              Sign Up
            </Typography>
            <Tabs
              value={tab}
              onChange={handleTabChange}
              centered
              sx={{ marginBottom: "20px" }}
            >
              <Tab
                label="All-in-one solution for Digital
            Marketing services"
              />
              {/* <Tab label="GST Filing" /> */}
            </Tabs>

            {!otpSent ? (
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  variant="outlined"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  sx={{ marginBottom: "15px" }}
                />
                <TextField
                  fullWidth
                  label="Mobile"
                  name="mobile"
                  variant="outlined"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                  sx={{ marginBottom: "15px" }}
                />
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  variant="outlined"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  sx={{ marginBottom: "15px" }}
                />
                <TextField
                  fullWidth
                  type="password"
                  label="Password"
                  name="password"
                  variant="outlined"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  sx={{ marginBottom: "15px" }}
                />
                <TextField
                  fullWidth
                  type="password"
                  label="Confirm Password"
                  name="confirmPassword"
                  variant="outlined"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  sx={{ marginBottom: "15px" }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={isLoading}
                >
                  {isLoading ? <CircularProgress size={24} /> : "Send OTP"}
                </Button>
                <div className="register-link">
                  <a href="/login">Already have an account? Login here</a>
                </div>
              </form>
            ) : (
              <Box sx={{ marginTop: "20px" }}>
                <TextField
                  fullWidth
                  label="Enter OTP"
                  variant="outlined"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  sx={{ marginBottom: "15px" }}
                />
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={verifyOtp}
                  disabled={isLoading}
                >
                  {isLoading ? <CircularProgress size={24} /> : "Verify OTP"}
                </Button>
              </Box>
            )}
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Signup;

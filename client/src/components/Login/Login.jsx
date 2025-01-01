// import React, { useState } from "react";
// import axios from "axios";

// function Login() {
//   const [mobile, setMobile] = useState("");
//   const [otp, setOtp] = useState("");
//   const [password, setPassword] = useState("");
//   const [isOtpLogin, setIsOtpLogin] = useState(true); // Toggle between OTP and password login
//   const [otpSent, setOtpSent] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSendOtp = async () => {
//     if (!mobile) {
//       alert("Please enter your mobile number");
//       return;
//     }

//     try {
//       setIsLoading(true);
//       const response = await axios.post(
//         "http://localhost:5000/api/auth/send-otp",
//         { mobile }
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
//       console.error("Error sending OTP:", error);
//       alert("Something went wrong. Please try again.");
//     }
//   };

//   const handleOtpLogin = async () => {
//     if (!otp) {
//       alert("Please enter the OTP");
//       return;
//     }

//     try {
//       setIsLoading(true);
//       const response = await axios.post(
//         "http://localhost:5000/api/auth/login-otp",
//         { mobile, otp }
//       );
//       setIsLoading(false);
//       if (response.data.success) {
//         alert("Login successful!");
//         // Redirect or perform actions post-login
//       } else {
//         alert("Invalid OTP. Please try again.");
//       }
//     } catch (error) {
//       setIsLoading(false);
//       console.error("Error logging in with OTP:", error);
//       alert("Something went wrong. Please try again.");
//     }
//   };

//   const handlePasswordLogin = async () => {
//     if (!password) {
//       alert("Please enter your password");
//       return;
//     }

//     try {
//       setIsLoading(true);
//       const response = await axios.post(
//         "http://localhost:5000/api/auth/login-password",
//         { mobile, password }
//       );
//       setIsLoading(false);
//       if (response.data.success) {
//         alert("Login successful!");
//         // Redirect or perform actions post-login
//       } else {
//         alert("Invalid credentials. Please try again.");
//       }
//     } catch (error) {
//       setIsLoading(false);
//       console.error("Error logging in with password:", error);
//       alert("Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <div style={{ maxWidth: "400px", margin: "0 auto" }}>
//       <h2>Login</h2>
//       <div>
//         <input
//           type="text"
//           placeholder="Mobile Number"
//           value={mobile}
//           onChange={(e) => setMobile(e.target.value)}
//           required
//         />
//       </div>
//       {isOtpLogin ? (
//         otpSent ? (
//           <div>
//             <input
//               type="text"
//               placeholder="Enter OTP"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               required
//             />
//             <button onClick={handleOtpLogin} disabled={isLoading}>
//               {isLoading ? "Verifying..." : "Login with OTP"}
//             </button>
//           </div>
//         ) : (
//           <button onClick={handleSendOtp} disabled={isLoading}>
//             {isLoading ? "Sending OTP..." : "Send OTP"}
//           </button>
//         )
//       ) : (
//         <div>
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button onClick={handlePasswordLogin} disabled={isLoading}>
//             {isLoading ? "Logging in..." : "Login with Password"}
//           </button>
//         </div>
//       )}
//       <div style={{ marginTop: "20px" }}>
//         <button onClick={() => setIsOtpLogin(!isOtpLogin)}>
//           {isOtpLogin ? "Login with Password" : "Login with OTP"}
//         </button>
//       </div>
//       <div style={{ marginTop: "10px" }}>
//         <a href="/signup">Don't have an account? Register here</a>
//       </div>
//     </div>
//   );
// }

// export default Login;
import React, { useState } from "react";
import axios from "axios";
import "./Login.css"; // Create and use a CSS file for styling
import TestimonialSection from "../TestimonialSection";

function Login() {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [isOtpLogin, setIsOtpLogin] = useState(true); // Toggle between OTP and password login
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = async () => {
    if (!mobile) {
      alert("Please enter your mobile number");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:4000/api/auth/send-otp",
        { mobile }
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
      console.error("Error sending OTP:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleOtpLogin = async () => {
    if (!otp) {
      alert("Please enter the OTP");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:4000/api/auth/login-otp ",
        { mobile, otp }
      );
      setIsLoading(false);
      if (response.data.success) {
        alert("Login successful!");
        // Redirect or perform actions post-login
      } else {
        alert("Invalid OTP. Please try again.");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error logging in with OTP:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handlePasswordLogin = async () => {
    if (!password) {
      alert("Please enter your password");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:4000/api/auth/login-password",
        { mobile, password }
      );
      setIsLoading(false);
      if (response.data.success) {
        alert("Login successful!");
        // Redirect or perform actions post-login
      } else {
        alert("Invalid credentials. Please try again.");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error logging in with password:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h2>Welcome to DigiShyam </h2>
            <p>
              All-in-one solution for growing your business with expert Digital
              Marketing services
            </p>
          </div>
          <div className="input-group">
            <input
              type="text"
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
              className="input-field"
            />
          </div>
          {isOtpLogin ? (
            otpSent ? (
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  className="input-field"
                />
                <button
                  onClick={handleOtpLogin}
                  disabled={isLoading}
                  className="btn btn-primary"
                >
                  {isLoading ? "Verifying..." : "Login with OTP"}
                </button>
              </div>
            ) : (
              <button
                onClick={handleSendOtp}
                disabled={isLoading}
                className="btn btn-primary"
              >
                {isLoading ? "Sending OTP..." : "Send OTP"}
              </button>
            )
          ) : (
            <div className="input-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input-field"
              />
              <button
                onClick={handlePasswordLogin}
                disabled={isLoading}
                className="btn btn-primary"
              >
                {isLoading ? "Logging in..." : "Login with Password"}
              </button>
            </div>
          )}
          <div className="toggle-option">
            <button
              onClick={() => setIsOtpLogin(!isOtpLogin)}
              className="btn btn-secondary"
            >
              {isOtpLogin ? "Login with Password" : "Login with OTP"}
            </button>
          </div>
          <div className="register-link">
            <a href="/signup">Don't have an account? Register here</a>
          </div>
        </div>
      </div>
      <div
        style={{ position: "absolute", left: "5%", width: "60%", top: "5%" }}
      >
        {" "}
        <TestimonialSection />
      </div>
    </>
  );
}

export default Login;

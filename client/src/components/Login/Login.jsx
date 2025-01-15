import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import TestimonialSection from "../TestimonialSection";
import { useSelector } from "react-redux";
const Login = () => {
  const { user } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   try {
  //     const { data } = await axios.post(
  //       "http://localhost:4000/api/auth/login",
  //       { email, password },
  //       { headers: { "Content-Type": "application/json" } }
  //     );
  //     localStorage.setItem("token", data.token);
  //     const userRole = JSON.parse(atob(data.token.split(".")[1])).role;
  //     user && navigate(`/${userRole}`);
  //   } catch (err) {
  //     alert(err.response?.data?.message || "Something went wrong!");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/auth/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      const { token } = data;
      const { role, name, _id } = JSON.parse(atob(token.split(".")[1]));
      localStorage.setItem("token", token);
      localStorage.setItem("userRole", role);
      localStorage.setItem("userName", name);
      // After login, call the login function from context to update user state
      // Update user state in context
      handleLogin({ role, name, _id }); // Update context with user data

      navigate(`/${role}`);
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Welcome to DigiShyam</h2>
          <p>
            All-in-one solution for growing your business with expert Digital
            Marketing services
          </p>
        </div>
        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="register-link">
          <a href="/signup">Don't have an account? Register here</a>
        </div>
      </div>
      <div
        style={{ position: "absolute", left: "5%", width: "60%", top: "5%" }}
      >
        <TestimonialSection />
      </div>
    </div>
  );
};

export default Login;

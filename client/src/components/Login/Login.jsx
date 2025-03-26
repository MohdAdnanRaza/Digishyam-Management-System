import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import API_BASE_URL from "../../config"; // Import API base URL
import "./Login.css";
import TestimonialSection from "../TestimonialSection";

const Login = () => {
  const { user } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/api/auth/login`, // Use API_BASE_URL here
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      const { token } = data;
      const { role, name, _id } = JSON.parse(atob(token.split(".")[1]));
      localStorage.setItem("token", token);
      localStorage.setItem("userRole", role);
      localStorage.setItem("userName", name);

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
          <h2>Welcome to Digishyam</h2>
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
        {/* <div className="register-link">
          <a href="/signup">Don't have an account? Register here</a>
        </div> */}
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

import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, roles }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    // Manually decode the JWT payload
    const base64Url = token.split(".")[1]; // Get the payload part of the token
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/"); // Replace URL-safe characters
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((char) => "%" + ("00" + char.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    const decoded = JSON.parse(jsonPayload);

    if (!roles.includes(decoded.role)) {
      return <Navigate to="/login" />;
    }

    return children;
  } catch (error) {
    // If decoding fails, handle the error
    console.error("Token decoding failed:", error);
    localStorage.removeItem("token");
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;

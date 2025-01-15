export const isAuthenticated = () => !!localStorage.getItem("token");

export const getUserRole = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    // JWT structure: header.payload.signature
    const payload = token.split(".")[1];
    const decodedPayload = JSON.parse(atob(payload)); // Decode the base64 payload
    return decodedPayload.role;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

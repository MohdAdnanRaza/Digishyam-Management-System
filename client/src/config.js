const API_BASE_URL =
  (typeof import.meta.env !== "undefined" && import.meta.env.VITE_API_BASE_URL)
    ? import.meta.env.VITE_API_BASE_URL
    : "http://195.35.7.93:4000";

console.log("API Base URL:", API_BASE_URL);
export default API_BASE_URL;

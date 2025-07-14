// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:5001/api", // Adjust to your ASP.NET Core port
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

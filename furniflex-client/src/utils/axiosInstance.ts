// src/utils/axiosInstance.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/", // Base URL for your backend
  timeout: 10000, // Request timeout
});

export default axiosInstance;

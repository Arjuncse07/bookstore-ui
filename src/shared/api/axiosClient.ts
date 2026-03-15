import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8989",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use((config) => {
  const raw = localStorage.getItem("bookstore_user");
  if (raw) {
    const user = JSON.parse(raw);
    config.headers["X-Username"] = user.username;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("bookstore_user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default axiosClient;

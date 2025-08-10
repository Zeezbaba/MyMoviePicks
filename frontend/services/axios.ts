import axios, { AxiosError } from "axios";

const axiosInstance = axios.create({
  baseURL:
    process.env.API_URL || "https://mymoviepicks-production.up.railway.app/api",
    headers: {
      "Content-Type": "application/json"
    }
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const config = error.config;
    const token = localStorage.getItem("token")
    console.log(token)
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

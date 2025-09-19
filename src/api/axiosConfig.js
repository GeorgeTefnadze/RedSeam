import axios from "axios";

// Create a new Axios instance
const apiClient = axios.create({
  baseURL: "https://api.redseam.redberryinternship.ge/api", // Your API base URL
});

// Use an interceptor to automatically add the token to every request
apiClient.interceptors.request.use(
  (config) => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("token");

    // If the token exists, add the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

export default apiClient;

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", // <-- đúng port của backend
});

// interceptor token nếu có
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

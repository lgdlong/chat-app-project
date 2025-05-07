import axios from "axios";
import { ACCESS_TOKEN_KEY } from "../constants/storageKeys";

// Tạo một axios instance dùng chung cho toàn bộ app
const api = axios.create({
  baseURL: "http://localhost:8080", // ✅ Thay đổi nếu backend chạy cổng khác
  withCredentials: true, // ✅ Giữ nếu cần gửi cookie (nếu backend hỗ trợ)
});

// Interceptor để tự động gắn token vào mọi request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY); // Lấy token từ localStorage

    const skipAuthUrls = ["/api/auth/login", "/api/auth/register"];
    const shouldSkip = skipAuthUrls.some((url) => config.url?.endsWith(url));

    console.log("🔄 Gọi API:", config.url, "với token:", token);

    if (!shouldSkip && token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
      console.log("✅ Gắn token vào request:", config.url);
    } else {
      console.log("⏭ Không gắn token vào request:", config.url);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// (Tuỳ chọn) Interceptor cho response – xử lý lỗi toàn cục
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 🔐 Token không hợp lệ hoặc đã hết hạn
      console.warn("🔒 Unauthorized! Token có thể đã hết hạn.");
      // Tùy bạn: redirect, xóa token, v.v.
      // localStorage.removeItem(ACCESS_TOKEN_KEY);
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;

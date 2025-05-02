import axios from "axios";

// Tạo một axios instance dùng chung cho toàn bộ app
const api = axios.create({
  baseURL: "http://localhost:8080", // ✅ Thay đổi nếu backend chạy cổng khác
  withCredentials: true, // ✅ Giữ nếu cần gửi cookie (nếu backend hỗ trợ)
});

// Interceptor để tự động gắn token vào mọi request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    // Kiểm tra headers tồn tại trước khi gán Authorization
    config.headers = config.headers || {};

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// (Tuỳ chọn) Interceptor cho response – xử lý lỗi toàn cục
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 🔐 Token không hợp lệ hoặc đã hết hạn
      console.warn("🔒 Unauthorized! Token có thể đã hết hạn.");
      // Tùy bạn: redirect, xóa token, v.v.
      // localStorage.removeItem("token");
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;

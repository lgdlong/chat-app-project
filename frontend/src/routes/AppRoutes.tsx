import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProfilePage from "../pages/ProfilePage";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  const location = useLocation();

  return (
    <Routes>
      {/* 📌 Route "/" tạm để tránh lỗi "No routes matched location '/'" */}
      <Route path="/" element={<div>Loading...</div>} />

      {/* 🔒 Các route yêu cầu đăng nhập */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      {/* 🌐 Các route công khai */}
      <Route
        path="/login"
        element={
          // ✅ Dùng key theo location để ép LoginPage mount lại nếu đang ở /login và navigate /login tiếp
          <LoginPage key={location.key} />
        }
      />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}
// // Đoạn code này định nghĩa các route trong ứng dụng React của bạn bằng cách sử dụng React Router. Nó bao gồm các route công khai như "/login" và "/register", cũng như các route yêu cầu đăng nhập như "/home" và "/profile". Các route yêu cầu đăng nhập được bảo vệ bởi component ProtectedRoute, đảm bảo rằng chỉ những người dùng đã đăng nhập mới có thể truy cập vào chúng. Nếu người dùng chưa đăng nhập và cố gắng truy cập vào một route được bảo vệ, họ sẽ được chuyển hướng đến trang đăng nhập ("/login"). Các route công khai không yêu cầu xác thực và có thể được truy cập bởi bất kỳ ai.

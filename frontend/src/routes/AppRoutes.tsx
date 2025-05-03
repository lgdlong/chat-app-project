import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import RegisterComplete from "../pages/RegisterCompletePage";
import ProfilePage from "../pages/ProfilePage";
import ProtectedRoute from "./ProtectedRoute"; // 👈 THÊM DÒNG NÀY

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* 🔒 Các route cần đăng nhập */}
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

      {/* Các route công khai */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/register-complete" element={<RegisterComplete />} />
    </Routes>
  );
}
// Đoạn code này định nghĩa các route cho ứng dụng React của bạn. Nó sử dụng React Router để quản lý điều hướng giữa các trang khác nhau trong ứng dụng. Các route được phân chia thành hai loại: các route cần đăng nhập và các route công khai. Các route cần đăng nhập được bảo vệ bởi một component có tên là ProtectedRoute, đảm bảo rằng người dùng phải đăng nhập mới có thể truy cập vào các trang đó.
// Các route công khai không yêu cầu đăng nhập và có thể được truy cập bởi bất kỳ ai. Mỗi route được ánh xạ đến một component tương ứng, ví dụ như HomePage, LoginPage, RegisterPage, v.v. Khi người dùng truy cập vào một route cụ thể, component tương ứng sẽ được hiển thị trên giao diện người dùng. Nếu người dùng cố gắng truy cập vào route "/" (trang chủ), họ sẽ được chuyển hướng đến trang đăng nhập ("/login").

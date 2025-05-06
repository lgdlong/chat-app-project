// ProtectedRoute.tsx

import { Navigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * ProtectedRoute đảm bảo rằng người dùng phải đăng nhập mới được truy cập route này.
 * Nếu đang loading → hiển thị "đang kiểm tra".
 * Nếu chưa đăng nhập → điều hướng về /login.
 * Nếu đã đăng nhập → cho hiển thị children (component được bảo vệ).
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useUser();

  if (loading) {
    return <div>Đang kiểm tra đăng nhập...</div>; // Có thể thay bằng spinner
  }

  if (user.id === -1) {
    console.warn("🔒 Chưa đăng nhập → chặn truy cập protected route");
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
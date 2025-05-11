// ProtectedRoute.tsx

import { Navigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import Spinner from "react-bootstrap/Spinner"; // Ensure this is the correct path or library
import { UserRole } from "../enums/UserEnums";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
}

/**
 * ProtectedRoute đảm bảo rằng người dùng phải đăng nhập mới được truy cập route này.
 * Nếu đang loading → hiển thị "đang kiểm tra".
 * Nếu chưa đăng nhập → điều hướng về /login.
 * Nếu đã đăng nhập → cho hiển thị children (component được bảo vệ).
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
}) => {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <div className="loading-container">
        <Spinner animation="border" /> Đang kiểm tra đăng nhập...
      </div>
    );
  }

  if (!user || user.id === -1) {
    console.warn("🔒 Chưa đăng nhập → chặn truy cập protected route");
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    console.warn(`🚫 Role mismatch – needs ${requiredRole}, got ${user.role}`);
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

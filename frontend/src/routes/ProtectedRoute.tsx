import { Navigate } from "react-router-dom";
import { useUser } from "../hooks/useUser"; // context chứa setUser
import { ACCESS_TOKEN_KEY } from "../constants/storageKeys";
import { useEffect } from "react";
import { isTokenValid } from "../utils/auth.ts"; // hàm kiểm tra token hợp lệ

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  const { user, setUser } = useUser();

  const payload = isTokenValid(token);

  useEffect(() => {
    // Nếu user chưa set thì lấy từ token
    if (payload && user.id === -1) {
      setUser({
        id: parseInt(payload.sub),
        username: payload.username,
        displayName: payload.displayName,
        email: payload.email,
        phone: payload.phone,
        picUrl: payload.picUrl,
        status: payload.status,
      });
    }
  }, [payload, setUser, user.id]);

  if (!payload) {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    console.warn("🔒 Token không hợp lệ hoặc đã hết hạn!");
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

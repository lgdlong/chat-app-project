import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useUser } from "../hooks/useUser"; // context chứa setUser
import { ACCESS_TOKEN_KEY } from "../constants/storageKeys";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

interface TokenPayload {
  sub: string;
  username: string;
  displayName: string;
  email: string;
  phone: string;
  picUrl: string;
  status: string;
  exp: number;
  [key: string]: any;
}

const isTokenValid = (token: string | null): TokenPayload | null => {
  if (!token) return null;

  try {
    const decoded = jwtDecode<TokenPayload>(token);
    const now = Date.now() / 1000;
    return decoded.exp > now ? decoded : null;
  } catch {
    return null;
  }
};

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
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

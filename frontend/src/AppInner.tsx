// AppInner.tsx

import { useEffect } from "react";
import { useUser } from "./hooks/useUser";
import { ACCESS_TOKEN_KEY } from "./constants/storageKeys";
import { defaultUser } from "./interfaces/User";
import { useNavigate } from "react-router-dom";
import { isTokenValid } from "./utils/auth";
import { getCurrentUser } from "./api/authApi";
import AppRoutes from "./routes/AppRoutes";

/**
 * AppInner là component trung tâm của ứng dụng (bên trong UserProvider).
 * Trách nhiệm:
 * - Kiểm tra xem có token trong localStorage không
 * - Nếu token hợp lệ → gọi API /me để xác thực và set user
 * - Nếu không hợp lệ hoặc không có → reset user và điều hướng về /login
 * - Nếu đang ở "/" → tự động điều hướng tới /home hoặc /login tùy trạng thái
 */
export default function AppInner() {
  const { setUser, setLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    console.log("🔍 AppInner mounted");
    console.log("🪪 Lấy token từ localStorage:", token);

    // Dùng để kết thúc trạng thái loading sau bất kỳ nhánh nào
    const finish = () => setLoading(false);

    // ❌ Nếu không có token
    if (!token) {
      console.warn("🚫 Không có token");
      setUser(defaultUser);
      if (window.location.pathname === "/") {
        console.log("➡️ Redirect / → /login");
        navigate("/login", { replace: true });
      }
      return finish();
    }

    // ❌ Nếu token hết hạn hoặc không hợp lệ
    const decoded = isTokenValid(token);
    if (!decoded) {
      console.warn("⛔ Token không hợp lệ hoặc hết hạn");
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      setUser(defaultUser);
      if (window.location.pathname === "/") {
        console.log("➡️ Redirect / → /login");
        navigate("/login", { replace: true });
      }
      return finish();
    }

    // ✅ Nếu token hợp lệ → xác thực với backend bằng API /me
    const checkToken = async () => {
      try {
        console.log("🔄 Gọi API: /me");
        const user = await getCurrentUser();
        console.log("✅ /me OK:", user);
        setUser(user);

        if (window.location.pathname === "/") {
          console.log("➡️ Redirect / → /home");
          navigate("/home", { replace: true });
        }
      } catch (err) {
        console.error("❌ Lỗi xác thực token với server:", err);
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        setUser(defaultUser);
        if (window.location.pathname === "/") {
          console.log("➡️ Redirect / → /login");
          navigate("/login", { replace: true });
        }
      } finally {
        finish();
      }
    };

    checkToken();
  }, [navigate, setUser, setLoading]);

  return <AppRoutes />;
}

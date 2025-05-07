import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import "./AuthPage.css";
import LoginHeader from "../components/auth/LoginHeader";
import LoginForm from "../components/auth/LoginForm";
import { useUser } from "../hooks/useUser"; // hoặc context/UserContext nếu chưa tách
import { defaultUser } from "../interfaces/User";
import { ACCESS_TOKEN_KEY } from "../constants/storageKeys";

export default function LoginPage() {
  // const navigate = useNavigate();
  const { setUser } = useUser();

  useEffect(() => {
    // ✅ XÓA TOKEN mỗi lần vào trang login
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    setUser(defaultUser); // hoặc setUser(defaultUser) nếu bạn dùng mặc định

    // ✅ Lấy token đã lưu từ lần đăng nhập trước -> tự động đăng nhập bằng token. Nếu không có token thì không làm gì cả
    /*
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (!token) return;

    const checkToken = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Invalid token");

        const user = await res.json();
        setUser(user);
        navigate("/account");
      } catch (err) {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        setUser(defaultUser)
      }
    };

    checkToken();
    */
  }, [setUser]);

  return (
    <div className="auth-page">
      <LoginHeader />
      <LoginForm />
    </div>
  );
}

import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN_KEY } from "../constants/storageKeys";
import { useUser } from "./useUser";
import { defaultUser } from "../interfaces/User";

export default function useAuth() {
  const navigate = useNavigate();
  const { setUser } = useUser(); // Lấy từ context

  const logoutUser = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    setUser(defaultUser);
    navigate("/login");
  };

  return { logoutUser };
}

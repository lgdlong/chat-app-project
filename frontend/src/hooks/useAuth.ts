import { useNavigate } from "react-router-dom";

export default function useAuth() {
  const navigate = useNavigate();

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return { logoutUser };
}

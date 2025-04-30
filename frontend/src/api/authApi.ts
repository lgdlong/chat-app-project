import api from "./axiosConfig";
import { LoginData } from "../interfaces/LoginData";
import { RegisterData } from "../interfaces/RegisterData";

// Gọi API đăng ký người dùng
export const registerUser = async (data: RegisterData) => {
  return await api.post("/api/auth/register", data);
};

// Gọi API đăng nhập người dùng
export const loginUser = async (data: LoginData) => {
  return await api.post("/api/auth/login", data);
};

export const getProfile = async () => {
  // Gọi API thật ở đây. Dưới đây là data mock:
  
  return {
    id: "1",
    username: "nguyenvana",
    email: "van.a@example.com",
    avatarUrl: "",
    bio: "Sinh viên CNTT năm 3.",
    createdAt: "2024-02-12T08:00:00Z",
  };
};
import api from "./axiosConfig";
import { LoginData } from "../interfaces/LoginData";
import { RegisterData } from "../interfaces/RegisterData";
import axios from "axios";

// Gọi API đăng ký người dùng
export const registerUser = async (data: RegisterData) => {
  return await axios.post("http://localhost:8080/api/users", data);
};

// Gọi API đăng nhập người dùng
export const loginUser = async (data: LoginData) => {
  return await api.post("/api/auth/login", data);
};

// ✅ Gọi API lấy thông tin người dùng hiện tại từ token
export const getCurrentUser = async () => {
  try {
    const res = await api.get("/api/auth/me");
    console.log("✅ GET /me thành công:", res.data);
    return res.data;
  } catch (err) {
    console.error("❌ Lỗi gọi /me:", err);
    throw err;
  }
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
    status: "online"
  };
};

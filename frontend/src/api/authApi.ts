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

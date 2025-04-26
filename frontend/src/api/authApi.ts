import axios from "axios";
import api from './axiosConfig';

// Định nghĩa kiểu dữ liệu gửi đi
interface RegisterData {
  username: string;
  email: string;
  phone: string;
  password: string;
}

interface LoginData {
  username: string;
  password: string;
}

// Gọi API đăng ký người dùng
export const registerUser = async (data: RegisterData) => {
  return await axios.post("/api/auth/users", data);
};

// Gọi API đăng nhập người dùng
export const loginUser = async (data: LoginData) => {
  return await api.post("/api/auth/login", data);
};
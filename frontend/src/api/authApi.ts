import axios from "axios";
import api from './axiosConfig';

// Định nghĩa kiểu dữ liệu gửi đi
interface RegisterData {
  username: string;
  phone: string;
  email: string;
  password: string;
}

interface LoginData {
  username: string;
  password: string;
}

// Gọi API đăng ký người dùng
export const registerUser = async (data: RegisterData) => {
  return await axios.post("http://localhost:8080/api/users", data);
};

// Gọi API đăng nhập người dùng
export const loginUser = async (data: LoginData) => {
  return await api.post("/api/auth/login", data);
};
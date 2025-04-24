import axios from "axios";

// Định nghĩa kiểu dữ liệu gửi đi
interface RegisterData {
  username: string;
  email: string;
  phone: string;
  password: string;
}

// Gọi API đăng ký người dùng
export const registerUser = async (data: RegisterData) => {
  return await axios.post("/api/auth/register", data);
};
import { UserResponseDTO } from "../interfaces/UserResponseDTO";
import api from "./axiosConfig";

/**
 * Tìm kiếm người dùng theo username hoặc số điện thoại
 * @param query - chuỗi tìm kiếm (username hoặc số điện thoại)
 * @returns Thông tin user hoặc null nếu không tìm thấy
 */
export const searchUser = async (
  query: string
): Promise<UserResponseDTO | null> => {
  try {
    const response = await api.get("/api/users/search", {
      params: { query },
    });
    return response.data;
  } catch (error) {
    return null; // nếu không tìm thấy hoặc lỗi server
  }
};

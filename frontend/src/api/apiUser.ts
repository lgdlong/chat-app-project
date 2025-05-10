import { UserResponseDTO } from "../interfaces/UserResponseDTO";
import { UserUpdateDTO } from "../interfaces/UserUpdateDTO";
import api from "./axiosConfig";



/**
 * Lấy profile của user đang đăng nhập từ /api/auth/me
 */
export const getMyProfile = async (): Promise<UserResponseDTO> => {
  try {
    const res = await api.get<UserResponseDTO>("/api/auth/me");
    return res.data;
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    throw error;
  }
};

export const updateMyProfile = async (
  data: UserUpdateDTO
): Promise<UserResponseDTO> => {
  try {
    // 1) Lấy thông tin hiện tại để có ID
    const me = await getMyProfile();
    
    // 2) Gọi API update
    const res = await api.put<UserResponseDTO>(
      `/api/users/${me.id}`,
      data
    );
    return res.data;
  } catch (error) {
    console.error("Failed to update profile:", error);
    throw error;
  }
};


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

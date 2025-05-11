import { AdminUserUpdate } from "../interfaces/AdminUserUpdate";
import { UserFullProps } from "../interfaces/UserFullProps";
import { UserResponseDTO } from "../interfaces/UserResponseDTO";
import { UserUpdateDTO } from "../interfaces/UserUpdateDTO";
import api from "./axiosConfig";

/**
 * Lấy danh sách tất cả người dùng (chỉ dùng cho admin).
 */
export const getAllUsers = async (): Promise<UserFullProps[]> => {
  try {
    const res = await api.get<UserFullProps[]>("/api/users");
    return res.data;
  } catch (error) {
    console.error("❌ Failed to fetch all users:", error);
    throw error;
  }
};

/**
 * Lấy profile của user đang đăng nhập.
 */
export const getMyProfile = async (): Promise<UserResponseDTO> => {
  try {
    const res = await api.get<UserResponseDTO>("/api/auth/me");
    return res.data;
  } catch (error) {
    console.error("❌ Failed to fetch profile:", error);
    throw error;
  }
};

/**
 * Người dùng tự cập nhật profile cá nhân.
 */
export const updateMyProfile = async (
  data: UserUpdateDTO
): Promise<UserResponseDTO> => {
  try {
    const me = await getMyProfile();
    const res = await api.put<UserResponseDTO>(`/api/users/${me.id}`, data);
    return res.data;
  } catch (error) {
    console.error("❌ Failed to update profile:", error);
    throw error;
  }
};

/**
 * Admin cập nhật thông tin của một người dùng bất kỳ.
 */
export const updateUserByAdmin = async (
  id: number,
  data: AdminUserUpdate
): Promise<UserFullProps> => {
  try {
    const res = await api.put<UserFullProps>(`/api/users/admin/${id}`, data); // 👈 lưu ý path dành riêng cho admin
    return res.data;
  } catch (error) {
    console.error("❌ Failed to update user by admin:", error);
    throw error;
  }
};

/**
 * Admin xoá người dùng bất kỳ theo ID.
 */
export const deleteUserByAdmin = async (id: number): Promise<void> => {
  try {
    await api.delete(`/api/users/${id}`);
  } catch (error) {
    console.error(`❌ Failed to delete user with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Tìm kiếm người dùng theo username hoặc số điện thoại.
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
    console.warn("⚠️ User not found or search failed:", error);
    return null;
  }
};

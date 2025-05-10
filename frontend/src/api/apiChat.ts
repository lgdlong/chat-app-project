import api from "./axiosConfig";
import { ChatListItemDTO } from "../interfaces/ChatListItemDTO";

/**
 * Gọi API để lấy danh sách các đoạn chat của người dùng hiện tại
 */
export const getChats = async (): Promise<ChatListItemDTO[]> => {
  const res = await api.get<ChatListItemDTO[]>("/api/chats");
  return res.data;
};

/**
 * Gọi API để tạo hoặc lấy đoạn chat 1-1 với một user
 */
export const createOrGetPrivateChat = async (
  targetUserId: number
): Promise<ChatListItemDTO> => {
  const res = await api.post("/api/chats/private", { targetUserId });
  return res.data;
};

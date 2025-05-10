import api from "./axiosConfig";
import { Message } from "../interfaces/Message";
import { Client } from "@stomp/stompjs";

export interface SendMessagePayload {
  privateChatId: number;
  senderId: number;
  content: string;
}

/**
 * ✅ REST: Lấy danh sách tin nhắn gần nhất của một đoạn chat
 */
export const getPrivateMessages = async (
  privateChatId: number,
  page = 0,
  size = 20
): Promise<Message[]> => {
  const res = await api.get(`/api/messages/private/${privateChatId}`, {
    params: { page, size },
  });

  return res.data as Message[];
};

/**
 * ✅ WebSocket: Gửi tin nhắn realtime qua STOMP
 */
export const sendMessageWs = (
  stompClient: Client | null,
  payload: SendMessagePayload
) => {
  if (stompClient?.connected) {
    stompClient.publish({
      destination: "/app/chat.sendMessage",
      body: JSON.stringify(payload),
    });
  } else {
    console.warn("⚠️ WebSocket chưa kết nối");
  }
};

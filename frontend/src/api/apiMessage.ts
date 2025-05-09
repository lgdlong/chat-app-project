import api from "./axiosConfig";

export interface SendMessagePayload {
  privateChatId: number;
  senderId: number;
  content: string;
}

// ✅ REST: Lấy tin nhắn cũ (gần nhất, phân trang)
export const getPrivateMessages = async (
  privateChatId: number,
  page = 0,
  size = 20
) => {
  const res = await api.get(`/api/messages/private/${privateChatId}`, {
    params: { page, size },
  });
  return res.data;
};

// ✅ WebSocket: Gửi tin nhắn realtime
// Hàm này chỉ gọi nếu WebSocket đã kết nối
export const sendMessageWs = (
  stompClient: any,
  payload: SendMessagePayload
) => {
  if (stompClient && stompClient.connected) {
    stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(payload));
  } else {
    console.warn("⚠️ WebSocket chưa kết nối");
  }
};

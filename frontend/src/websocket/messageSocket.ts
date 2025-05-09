// src/websocket/messageSocket.ts
import { Client, Frame, IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";

let stompClient: Client | null = null;

/**
 * Kết nối WebSocket và đăng ký các subscription
 */
export const connectMessageSocket = (
  onChatMessage: (msg: any) => void,
  chatId: number,
  onNotification?: (noti: any) => void
) => {
  const socket = new SockJS("http://localhost:8080/ws");
  stompClient = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5000,
    debug: (str) => console.log(str),
  });

  stompClient.onConnect = (frame: Frame) => {
    console.log("🟢 WebSocket connected:", frame);

    // ✅ Subscribe chat riêng (1-1 hoặc group)
    stompClient?.subscribe(
      `/chat-room/private.${chatId}`,
      (message: IMessage) => {
        const body = JSON.parse(message.body);
        onChatMessage(body);
      }
    );

    // ✅ Subscribe nhận notification riêng (nếu có)
    if (onNotification) {
      stompClient?.subscribe(
        "/user/queue/notifications",
        (message: IMessage) => {
          const body = JSON.parse(message.body);
          onNotification(body);
        }
      );
    }
  };

  stompClient.onStompError = (frame) => {
    console.error("❌ STOMP error:", frame.headers["message"], frame.body);
  };

  stompClient.activate();
};

/**
 * Ngắt kết nối WebSocket
 */
export const disconnectMessageSocket = () => {
  if (stompClient?.connected) {
    stompClient.deactivate();
    console.log("🔴 WebSocket disconnected");
  }
};

/**
 * Gửi tin nhắn WebSocket (có thể move vào messageApi nếu thích)
 */
export const sendMessageSocket = (payload: {
  privateChatId: number;
  senderId: number;
  content: string;
}) => {
  if (stompClient?.connected) {
    stompClient.publish({
      destination: "/app/chat.sendMessage",
      body: JSON.stringify(payload),
    });
  } else {
    console.warn("⚠️ Không thể gửi vì WebSocket chưa kết nối");
  }
};

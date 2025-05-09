// src/websocket/messageSocket.ts
import { Client, Frame, IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { ACCESS_TOKEN_KEY } from "../constants/storageKeys";
import { SendMessagePayload } from "../api/apiMessage";
import {
  DeliveryStatus,
  MessageStatusDTO,
} from "../interfaces/MessageStatusDTO";
import { Message } from "../interfaces/Message";
import { isValidMessage } from "../utils/validate";

let stompClient: Client | null = null;

/**
 * ✅ Kết nối WebSocket và đăng ký các subscription
 */
export const connectMessageSocket = (
  onChatMessage: (msg: Message) => void,
  chatId: number,
  onNotification?: (noti: MessageStatusDTO) => void,
  onConnected?: () => void
) => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
-  const socket = new SockJS(`http://localhost:8080/ws?token=${token}`);
+  const WS_BASE_URL = process.env.REACT_APP_WS_URL || 'http://localhost:8080/ws';
+  const socket = new SockJS(`${WS_BASE_URL}?token=${token}`);

  stompClient = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5000,
    debug: (str) => console.log(str),
  });

  stompClient.onConnect = (frame: Frame) => {
    console.log("🟢 WebSocket connected:", frame);

    // 🔔 SUBSCRIBE tin nhắn từ đoạn chat cụ thể
    stompClient?.subscribe(
      `/chat-room/private.${chatId}`,
      (message: IMessage) => {
        try {
          const body = JSON.parse(message.body);
          if (isValidMessage(body)) {
            onChatMessage(body);
          } else {
            console.warn("⚠️ Dữ liệu không hợp lệ, bỏ qua:", body);
          }
        } catch (err) {
          console.error("❌ Lỗi parse chat message:", err);
        }
      }
    );

    // 🔔 SUBSCRIBE thông báo trạng thái tin nhắn
    stompClient?.subscribe("/user/queue/notifications", (message: IMessage) => {
      try {
        const statusUpdate: MessageStatusDTO = JSON.parse(message.body);
        console.log("📥 MessageStatus received:", statusUpdate);

        // Gửi ra ngoài nếu cần
        onNotification?.(statusUpdate);
      } catch (err) {
        console.error("❌ Lỗi parse message status:", err);
      }
    });

    onConnected?.();
  };

  stompClient.onStompError = (frame) => {
    console.error("❌ STOMP error:", frame.headers["message"], frame.body);
  };

  stompClient.activate();
};

/**
 * ✅ Ngắt kết nối WebSocket
 */
export const disconnectMessageSocket = () => {
  if (stompClient?.connected) {
    stompClient.deactivate();
    console.log("🔴 WebSocket disconnected");
  }
};

/**
 * ✅ Gửi tin nhắn realtime
 */
export const sendMessageSocket = (payload: SendMessagePayload) => {
  if (stompClient?.connected) {
    stompClient.publish({
      destination: "/app/chat.sendMessage",
      body: JSON.stringify(payload),
    });
  } else {
    console.warn("⚠️ Không thể gửi vì WebSocket chưa kết nối");
  }
};

/**
 * ✅ Gửi xác nhận trạng thái tin nhắn (DELIVERED, SEEN)
 */
export const sendMessageStatusSocket = (payload: {
  messageId: number;
  userId: number;
  status: DeliveryStatus;
}) => {
  if (stompClient?.connected) {
    stompClient.publish({
      destination: "/app/chat.acknowledge",
      body: JSON.stringify(payload),
    });
  } else {
    console.warn("⚠️ Không thể gửi status vì WebSocket chưa kết nối");
  }
};

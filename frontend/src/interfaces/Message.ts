import { DeliveryStatus } from "./MessageStatusDTO";

// Dữ liệu trả về từ server
export interface Message {
  id: number;
  privateChatId: number;
  groupChatId?: number | null;
  senderId: number;
  content: string;
  type: "TEXT" | "IMAGE" | "FILE";
  mediaId?: number | null;
  replyToId?: number | null;
  createdAt: string; // Server trả về dạng ISO string
  isRevoked: boolean;
  revokedAt?: string | null;
  // ✅ Optional: trạng thái gửi/nhận của người dùng hiện tại
  deliveryStatus?: DeliveryStatus;
}

// Tin nhắn tạm thời client tạo ra
export interface TempMessage {
  id: string; // "temp-<timestamp>"
  privateChatId: number;
  senderId: number;
  content: string;
  createdAt: string; // ✅ đổi từ Date → string (ISO)
  type: "TEXT"; // ✅ bắt buộc TEXT luôn cho tạm
  isRevoked: false; // ✅ luôn false cho tạm
}

// ✅ Union type dùng cho UI
export type AnyMessage = Message | TempMessage;

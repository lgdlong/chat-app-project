import { AnyMessage, Message, TempMessage } from "../interfaces/Message";
import { MessageStatusDTO } from "../interfaces/MessageStatusDTO";

/** Kiểm tra một tin có phải là message tạm thời */
export function isTempMessage(message: AnyMessage): message is TempMessage {
  return typeof message.id === "string" && message.id.startsWith("temp-");
}

/** Thay thế hoặc xóa tin nhắn tạm khi server trả về bản thật */
export function replaceTempMessageWithReal(
  messages: AnyMessage[],
  real: Message
): AnyMessage[] {
  let replaced = false;
  const updated = messages.map((msg) => {
    if (
      isTempMessage(msg) &&
      msg.senderId === real.senderId &&
      msg.content === real.content &&
      Math.abs(
        new Date(msg.createdAt).getTime() - new Date(real.createdAt).getTime()
      ) < 3000
    ) {
      replaced = true;
      return real;
    }
    return msg;
  });

  // Nếu không thay được, thêm vào cuối
  if (!replaced) updated.push(real);

  // Đảm bảo đúng thứ tự thời gian
  return updated.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );
}

export function updateMessageStatusInState(
  messages: AnyMessage[],
  statusUpdate: MessageStatusDTO
): AnyMessage[] {
  return messages.map((msg) => {
    // Chỉ update tin nhắn thật (id là số) và đúng ID
    if (
      typeof msg.id === "number" &&
      msg.id === statusUpdate.messageId &&
      msg.senderId !== statusUpdate.userId // Tránh tự gán status của mình
    ) {
      return {
        ...msg,
        deliveryStatus: statusUpdate.status, // gán trạng thái mới
      };
    }
    return msg;
  });
}

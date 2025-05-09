import { Message } from "../interfaces/Message";

export function isValidMessage(obj: any): obj is Message {
  return (
    obj &&
    typeof obj === "object" &&
    typeof obj.id === "number" &&
    typeof obj.privateChatId === "number" &&
    typeof obj.senderId === "number" &&
    typeof obj.content === "string" &&
    typeof obj.type === "string" &&
    typeof obj.createdAt === "string" &&
    typeof obj.isRevoked === "boolean"
  );
}

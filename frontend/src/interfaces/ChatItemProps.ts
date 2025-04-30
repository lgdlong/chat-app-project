import { Chat } from "./Chat";

// Nhận props kiểu Chat
export interface ChatItemProps {
  chat: Chat;
  isSelected: boolean;
  onSelect: (chatId: number) => void;
}

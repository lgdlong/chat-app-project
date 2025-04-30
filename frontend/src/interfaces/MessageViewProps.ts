import { Message } from "../interfaces/Message";

// Props cho MessageList
export interface MessageViewProps {
  messages: Message[];
  currentUserId: number;
}

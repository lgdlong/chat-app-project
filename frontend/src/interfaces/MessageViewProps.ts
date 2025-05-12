import { AnyMessage } from "../interfaces/Message";

// Props cho MessageList
export interface MessageViewProps {
  messages: AnyMessage[];
  currentUserId: number;
  onRecall: (messageId: number) => void;
}

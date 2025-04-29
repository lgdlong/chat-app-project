import { useEffect, useRef } from "react";
import { MessageViewProps } from "../interfaces/MessageViewProps";
import { Container } from "react-bootstrap";
import "./ChatView.css";

export default function MessageView({
  messages,
  currentUserId,
}: MessageViewProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Container
      fluid
      className="p-3 message-view-container"
    >
      {messages.map((msg) => {
        const isMe = msg.sender === String(currentUserId);
        return (
          <div
            key={msg.id}
            className={`message-item ${isMe ? "me" : "other"}`}
          >
            <div className="message-bubble">{msg.content}</div>
          </div>
        );
      })}
      <div ref={bottomRef} />
    </Container>
  );
}

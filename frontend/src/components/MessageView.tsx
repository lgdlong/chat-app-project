import { Container } from "react-bootstrap";
import { useEffect, useRef } from "react";
import { MessageViewProps } from "../interfaces/MessageViewProps";

export default function MessageView({
  messages,
  currentUserId,
}: MessageViewProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Tự động scroll xuống dưới khi có tin nhắn mới
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Container
      fluid
      className="p-3"
      style={{ height: "100%", overflowY: "auto" }}
    >
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`message-item ${
            msg.sender === String(currentUserId) ? "me" : "other"
          }`}
          style={{
            marginBottom: "10px",
            textAlign: msg.sender === String(currentUserId) ? "right" : "left",
          }}
        >
          <div
            style={{
              display: "inline-block",
              backgroundColor:
                msg.sender === String(currentUserId) ? "#007bff" : "#f0f0f0",
              color: msg.sender === String(currentUserId) ? "white" : "black",
              borderRadius: "20px",
              padding: "10px 15px",
              maxWidth: "70%",
              wordBreak: "break-word",
            }}
          >
            {msg.content}
          </div>
        </div>
      ))}
      <div ref={bottomRef} />
    </Container>
  );
}

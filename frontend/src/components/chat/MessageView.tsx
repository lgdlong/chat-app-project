import { useEffect, useRef } from "react";
import { MessageViewProps } from "../../interfaces/MessageViewProps";
import { Container } from "react-bootstrap";
import "./ChatView.css";
import { isTempMessage } from "../../utils/messageUtils";

export default function MessageView({
  messages,
  currentUserId,
}: MessageViewProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Container fluid className="p-3 message-view-container">
      {messages.map((msg) => {
        const isMe = msg.senderId === currentUserId;
        const isTemp = isTempMessage(msg);

        return (
          <div
            key={msg.id}
            className={`message-item ${isMe ? "me" : "other"} ${
              isTemp ? "sending" : ""
            }`}
          >
            <div className="message-bubble">
              {msg.content}
              {isTemp && <span className="sending-dots">...</span>}
            </div>
            <div className="message-meta">
              {!isTemp && msg.deliveryStatus && (
                <small className="message-status-text text-muted">
                  {msg.deliveryStatus.toLowerCase()}
                </small>
              )}
            </div>
          </div>
        );
      })}
      <div ref={bottomRef} />
    </Container>
  );
}

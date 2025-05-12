// src/components/chat/MessageView.tsx
import { useEffect, useRef, useState } from "react";
import { MessageViewProps } from "../../interfaces/MessageViewProps";
import { Container } from "react-bootstrap";
import "./MessageView.css";
import { isTempMessage } from "../../utils/messageUtils";

export default function MessageView({
  messages,
  currentUserId,
  onRecall,
}: MessageViewProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [openMenuFor, setOpenMenuFor] = useState<number | null>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // When user clicks “Thu hồi”
  const handleRecallClick = (msgId: number) => {
    onRecall(msgId);
    setOpenMenuFor(null);
  };

  return (
    <Container fluid className="p-3 message-view-container">
      {messages.map((msg) => {
        const isMe = msg.senderId === currentUserId;
        const isTemp = isTempMessage(msg);
        const isServerMsg = typeof msg.id === "number";

        return (
          <div
            key={msg.id}
            className={`message-item ${isMe ? "me" : "other"} ${isTemp ? "sending" : ""
              }`}
            onMouseLeave={() => setOpenMenuFor(null)}
          >
            {/* ◀ EDIT: wrap bubble + button into a flex row */}
            <div className="message-header-row">
              <div
                className={`message-bubble ${msg.isRevoked ? "revoked" : ""}`}
              >
                {msg.isRevoked ? (
                  <em className="text-muted"> Tin nhắn đã thu hồi </em>
                ) : (
                  msg.content
                )}
              </div>

              {/* ◀ chỉ hiển thị wrapper với nút + menu */}
              {isMe && !msg.isRevoked && isServerMsg && (
                <div className="message-action-wrapper">
                  <button
                    className="message-actions-btn"
                    onClick={() =>
                      setOpenMenuFor(
                        openMenuFor === msg.id ? null : (msg.id as number)
                      )
                    }
                  >
                    ⋮{/* Unicode U+22EE vertical ellipsis */}
                  </button>

                  {openMenuFor === msg.id && (
                    <ul className="message-action-menu">
                      <li onClick={() => handleRecallClick(msg.id as number)}>
                        🗑️ Thu hồi{/* Unicode U+1F5D1 wastebasket */}
                      </li>
                      {/* <li>↩️ Trả lời</li> */}
                      {/* <li>😊 Phản ứng</li> */}
                    </ul>
                  )}
                </div>
              )}
            </div>

            {/* ◀ phần meta hiển thị trạng thái gửi/đọc */}
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
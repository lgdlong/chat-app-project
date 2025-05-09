import { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import "./MessageInput.css";

interface MessageInputProps {
  onSend: (message: string) => void;
  placeholder?: string;
}

/**
 * MessageInput – Component nhập tin nhắn:
 * - Gửi bằng Enter hoặc nút "Send"
 * - Shift + Enter để xuống dòng
 */
export default function MessageInput({
  onSend,
  placeholder = "Type your message...",
}: MessageInputProps) {
  const [message, setMessage] = useState("");

  // Gửi tin nhắn (sau khi trim)
  const handleSend = () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;
    onSend(trimmedMessage);
    setMessage(""); // Reset input
  };

  // Xử lý nhấn phím (Enter để gửi, Shift+Enter để xuống dòng)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Ngăn xuống dòng
      handleSend();
    }
  };

  return (
    <div className="chat-input-area">
      <Form className="p-2">
        <Row className="align-items-end">
          {/* Ô nhập tin nhắn */}
          <Col xs={10}>
            <Form.Control
              as="textarea"
              rows={1}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              style={{ resize: "none", height: "40px" }}
            />
          </Col>

          {/* Nút gửi */}
          <Col xs={2}>
            <Button
              variant="primary"
              onClick={handleSend}
              className="w-100"
              disabled={!message.trim()}
            >
              Send
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

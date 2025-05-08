import "./ChatView.css";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";
import MessageView from "./MessageView";
import { Message } from "../../interfaces/Message";
import { ChatListItemDTO } from "../../interfaces/ChatListItemDTO";
// export default function ChatView({chat, messages}: { chat: ChatResponseDTO; messages: Message[] }) {
export default function ChatView({ chat }: { chat: ChatListItemDTO  }) {
  const [messageSender, setMessageSender] = useState("");
  const [role, setRole] = useState<"1" | "2">("1"); // 1: Sender, 2: Receiver
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: "2", content: "Hello!", createdAt: new Date() },
    { id: 2, sender: "1", content: "Hi!", createdAt: new Date() },
    { id: 3, sender: "2", content: "How are you?", createdAt: new Date() },
    { id: 4, sender: "1", content: "I'm good, thanks!", createdAt: new Date() },
    { id: 5, sender: "2", content: "Great to hear!", createdAt: new Date() },
    { id: 6, sender: "1", content: "What about you?", createdAt: new Date() },
    { id: 7, sender: "2", content: "Doing well too!", createdAt: new Date() },
    {
      id: 8,
      sender: "1",
      content: "Let's catch up soon.",
      createdAt: new Date(),
    },
    { id: 9, sender: "2", content: "Definitely!", createdAt: new Date() },
    { id: 10, sender: "1", content: "See you later!", createdAt: new Date() },
    {
      id: 11,
      sender: "2",
      content: "Talk to you later!",
      createdAt: new Date(),
    },
    { id: 12, sender: "1", content: "See you soon!", createdAt: new Date() },
    { id: 13, sender: "2", content: "See you soon!", createdAt: new Date() },
    { id: 14, sender: "1", content: "See you soon!", createdAt: new Date() },
  ]);

  const handleSend = (sender: "1" | "2", content: string) => {
    if (!content.trim()) return;
    const newMessage: Message = {
      id: messages.length + 1,
      sender,
      content: content.trim(),
      createdAt: new Date(),
    };
    setMessages([...messages, newMessage]);
    setMessageSender("");
  };

  return (
    <main>
      <div id="chatViewContainer">
        <header className="d-flex align-items-center">
          <Row className="d-flex align-items-center w-100">
            <Col md={2}>
              <img src={chat.avatarUrl} alt="Img" className="avatar-header" />
            </Col>
            <Col md={10}>
              <h2 className="chat-name-header">{chat.displayName}</h2>
            </Col>
          </Row>
        </header>

        <article className="message-area">
          <MessageView messages={messages} currentUserId={1} />

          <div className="chat-input-area">
            {/* Dùng để test nhắn 2 chiều */}
            <Form.Select
              aria-label="Sender"
              style={{ width: "200px", marginLeft: "10px" }}
              onChange={(e) => setRole(e.target.value as "1" | "2")}
            >
              <option value="1">Sender</option>
              <option value="2">Receiver</option>
            </Form.Select>

            <Form className="p-2">
              <Row className="align-items-end">
                <Col xs={10}>
                  <Form.Control
                    as="textarea"
                    rows={1}
                    value={messageSender}
                    onChange={(e) => setMessageSender(e.target.value)}
                    placeholder="Type your message..."
                    style={{ resize: "none", height: "40px" }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSend(role, messageSender);
                      }
                    }}
                  />
                </Col>
                <Col xs={2}>
                  <Button
                    variant="primary"
                    onClick={() => handleSend(role, messageSender)}
                    className="w-100"
                  >
                    Send
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </article>
      </div>
    </main>
  );
}

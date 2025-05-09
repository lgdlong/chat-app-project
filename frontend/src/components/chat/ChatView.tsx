import "./ChatView.css";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import MessageView from "./MessageView";
import { Message } from "../../interfaces/Message";
import { ChatListItemDTO } from "../../interfaces/ChatListItemDTO";
import {
  connectMessageSocket,
  disconnectMessageSocket,
  sendMessageSocket,
} from "../../websocket/messageSocket";
import { getPrivateMessages } from "../../api/apiMessage";
import { useUser } from "../../hooks/useUser"; // ✅ dùng hook

export default function ChatView({ chat }: { chat: ChatListItemDTO }) {
  const { user } = useUser(); // ✅ lấy user từ context
  const [messageSender, setMessageSender] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const oldMessages = await getPrivateMessages(chat.chatId);
        setMessages(oldMessages);
      } catch (err) {
        console.error("❌ Lỗi khi load tin nhắn:", err);
      }
    };

    loadMessages();

    connectMessageSocket(
      (newMsg) => setMessages((prev) => [...prev, newMsg]),
      chat.chatId
    );

    return () => {
      disconnectMessageSocket();
    };
  }, [chat.chatId]);

  const handleSend = () => {
    const content = messageSender.trim();
    if (!content || !user) return;

    sendMessageSocket({
      privateChatId: chat.chatId,
      senderId: user.id,
      content,
    });

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
          <MessageView messages={messages} currentUserId={user?.id || -1} />

          <div className="chat-input-area">
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
                        handleSend();
                      }
                    }}
                  />
                </Col>
                <Col xs={2}>
                  <Button
                    variant="primary"
                    onClick={handleSend}
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
import "./ChatView.css";
import { Chat } from "../interfaces/Chat";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";
import MessageView from "./MessageView";
import { Message } from "../interfaces/Message";

export default function ChatView() {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() !== "") {
      console.log("Send message:", message);
      setMessage(""); // Clear input after sending
    }
  };

  const chat: Chat = {
    chatId: 1,
    chatAvt: "https://picsum.photos/id/237/200/300",
    chatType: "PRIVATE",
    chatName: "Phung Luu Hoang Long",
    createdBy: 1,
    createdAt: new Date(),
  };

  const messages: Message[] = [
    { id: 1, sender: "2", content: "Hello!", createdAt: new Date() },
    { id: 2, sender: "1", content: "Hi!", createdAt: new Date() },
  ];

  return (
    <main>
      <div id="chatViewContainer">
        <header className="d-flex align-items-center">
          <Row className="d-flex align-items-center">
            <Col md={2}>
              <img src={chat.chatAvt} alt="Img" className="avatar-header" />
            </Col>
            <Col md={10}>
              <h2 className="chat-name-header">{chat.chatName}</h2>
            </Col>
          </Row>
        </header>
        <article>
          <MessageView
            messages={messages}
            currentUserId={Number.parseInt(
              messages[messages.length - 1].sender
            )}
          />
          <div id="chat-box-input-container-id">
            <div id="chat-box-input-container">
              <div id="chat-box-bar"></div>
              <Form id="chat-input" className="p-2">
                <Row className="align-items-end">
                  <Col xs={10}>
                    <Form.Control
                      as="textarea"
                      rows={1}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message..."
                      style={{ resize: "none", height: "40px" }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault(); // Prevent newline
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
          </div>
        </article>
      </div>
    </main>
  );
}

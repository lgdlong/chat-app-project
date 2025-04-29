import "./ChatView.css";
import { Chat } from "../interfaces/Chat";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";
import MessageView from "./MessageView";
import { Message } from "../interfaces/Message";

export default function ChatView() {
  const [messageSender, setMessageSender] = useState("");
  const [messageOther, setMessageOther] = useState("");
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
    sender === "1" ? setMessageSender("") : setMessageOther("");
  };

  const chat: Chat = {
    chatId: 1,
    chatAvt: "https://picsum.photos/id/237/200/300",
    chatType: "PRIVATE",
    chatName: "Phung Luu Hoang Long",
    createdBy: 1,
    createdAt: new Date(),
  };

  return (
    <main>
      <div id="chatViewContainer">
        <header className="d-flex align-items-center">
          <Row className="d-flex align-items-center w-100">
            <Col md={2}>
              <img src={chat.chatAvt} alt="Img" className="avatar-header" />
            </Col>
            <Col md={10}>
              <h2 className="chat-name-header">{chat.chatName}</h2>
            </Col>
          </Row>
        </header>

        <article className="message-area">
          <MessageView messages={messages} currentUserId={1} />

          <div className="chat-input-area">
            <Form className="p-2">
              <Row className="align-items-end">
                <Col xs={10}>
                  <Form.Control
                    as="textarea"
                    rows={1}
                    value={messageOther}
                    onChange={(e) => setMessageOther(e.target.value)}
                    placeholder="Type other message..."
                    style={{ resize: "none", height: "40px" }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSend("2", messageOther);
                      }
                    }}
                  />
                </Col>
                <Col xs={2}>
                  <Button
                    variant="secondary"
                    onClick={() => handleSend("2", messageOther)}
                    className="w-100"
                  >
                    Send
                  </Button>
                </Col>
              </Row>
            </Form>

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
                        handleSend("1", messageSender);
                      }
                    }}
                  />
                </Col>
                <Col xs={2}>
                  <Button
                    variant="primary"
                    onClick={() => handleSend("1", messageSender)}
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
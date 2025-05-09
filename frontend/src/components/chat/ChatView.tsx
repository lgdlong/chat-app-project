import "./ChatView.css";
import { Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import MessageView from "./MessageView";
import MessageInput from "./MessageInput";
import { ChatListItemDTO } from "../../interfaces/ChatListItemDTO";
import { AnyMessage } from "../../interfaces/Message";
import {
  connectMessageSocket,
  disconnectMessageSocket,
  sendMessageSocket,
} from "../../websocket/messageSocket";
import { useUser } from "../../hooks/useUser";
import {
  replaceTempMessageWithReal,
  updateMessageStatusInState,
} from "../../utils/messageUtils";
import { getPrivateMessages } from "../../api/apiMessage";

export default function ChatView({ chat }: { chat: ChatListItemDTO }) {
  const { user } = useUser();
  const [messages, setMessages] = useState<AnyMessage[]>([]);
  const [wsConnected, setWsConnected] = useState(false);

  useEffect(() => {
    setMessages([]);          // <-- clear immediately
    const loadMessages = async () => {
      try {
        const oldMessages = await getPrivateMessages(chat.chatId);
        oldMessages.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        setMessages(oldMessages);
      } catch (err) {
        // ...
      }
    };

    loadMessages();
  }, [chat.chatId]);
        console.error("❌ Lỗi khi load tin nhắn cũ:", err);
      }
    };

    loadMessages();

    connectMessageSocket(
      (newMsg) => {
        setMessages((prev) => {
          // ✅ Replace temp message nếu trùng nội dung và thời gian gần
          const updated = replaceTempMessageWithReal(prev, newMsg);

          const exists = updated.some((m) => m.id === newMsg.id);
          return exists ? updated : [...updated, newMsg];
        });
      },
      chat.chatId,
      (statusUpdate) => {
        setMessages((prev) => updateMessageStatusInState(prev, statusUpdate));
      },
      () => setWsConnected(true)
    );

    return () => {
      disconnectMessageSocket();
      setWsConnected(false);
    };
  }, [chat.chatId]);

  const handleSend = (content: string) => {
    if (!content || !user) return;

    // const tempId = `temp-${Date.now()}`;
    // const tempMessage: AnyMessage = {
    //   id: tempId,
    //   privateChatId: chat.chatId,
    //   senderId: user.id,
    //   content,
    //   createdAt: new Date().toISOString(),
    //   type: "TEXT",
    //   isRevoked: false,
    // };

    // setMessages((prev) => [...prev, tempMessage]);

    if (wsConnected) {
      sendMessageSocket({
        privateChatId: chat.chatId,
        senderId: user.id,
        content,
      });
    } else {
      console.warn("⚠️ Không thể gửi vì WebSocket chưa sẵn sàng");
    }
  };

  return (
    <main>
      <div id="chatViewContainer">
        {/* Header hiển thị tên + avatar */}
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

        {/* Khung hiển thị và nhập tin nhắn */}
        <article className="message-area">
          <MessageView messages={messages} currentUserId={user?.id || -1} />
          <MessageInput onSend={handleSend} />
        </article>
      </div>
    </main>
  );
}

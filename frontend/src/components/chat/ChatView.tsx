// src/components/chat/ChatView.tsx
import "./ChatView.css";
import { Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import MessageView from "./MessageView";
import MessageInput from "./MessageInput";
import { ChatListItemDTO } from "../../interfaces/ChatListItemDTO";
import { AnyMessage, Message } from "../../interfaces/Message";
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
import { getPrivateMessages, recallMessage } from "../../api/apiMessage"; // ◀ EDIT: import recall API

// Type-guard để phân biệt message server (id là number) với temp-message (id là string)
function isServerMessage(m: AnyMessage): m is Message {
  return typeof m.id === "number";
}

export default function ChatView({ chat }: { chat: ChatListItemDTO }) {
  const { user } = useUser();
  const [messages, setMessages] = useState<AnyMessage[]>([]);
  const [wsConnected, setWsConnected] = useState(false);

  // ◀ EDIT: hàm gọi API thu hồi và cập nhật local state
  const handleRecall = async (messageId: number) => {
    try {
      // Gọi backend để set isRevoked = true
      const { id: recalledId, isRevoked, revokedAt } = await recallMessage(
        messageId
      );
      // Cập nhật ngay trong local state
      setMessages((prev) =>
        prev.map((m) =>
          isServerMessage(m) && m.id === recalledId
            ? { ...m, isRevoked, revokedAt }
            : m
        )
      );
    } catch (err) {
      console.error("❌ Failed to recall:", err);
      alert("Không thể thu hồi tin nhắn");
    }
  };

  useEffect(() => {
    setMessages([]); // ✅ Clear tin nhắn cũ trước khi load mới

    // ✅ Gọi API lấy tin nhắn
    const loadMessages = async () => {
      try {
        const oldMessages = await getPrivateMessages(chat.chatId);
        oldMessages.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() -
            new Date(b.createdAt).getTime()
        );
        setMessages(oldMessages);
      } catch (err) {
        console.error("❌ Lỗi khi load tin nhắn cũ:", err);
      }
    };

    loadMessages();

    // ✅ Mở kết nối WebSocket
    connectMessageSocket(
      (newMsg) => {
        console.log("[ChatView] onChatMessage()", newMsg);
        setMessages((prev) => {
          const updated = replaceTempMessageWithReal(prev, newMsg);
          const exists = updated.some((m) => m.id === newMsg.id);
          return exists ? updated : [...updated, newMsg];
        });
      },
      chat.chatId,
      (statusUpdate) => {
        setMessages((prev) => updateMessageStatusInState(prev, statusUpdate));
      },
      // ◀ EDIT: không dùng WS revoke callback ở đây
      undefined,
      () => setWsConnected(true)
    );

    return () => {
      disconnectMessageSocket();
      setWsConnected(false);
    };
  }, [chat.chatId]);

  // ✅ Gửi tin nhắn thật, không tạo tin tạm
  const handleSend = (content: string) => {
    if (!content || !user) return;

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
              <img
                src={chat.avatarUrl}
                alt="Img"
                className="avatar-header"
              />
            </Col>
            <Col md={10}>
              <h2 className="chat-name-header">{chat.displayName}</h2>
            </Col>
          </Row>
        </header>

        {/* Khung hiển thị và nhập tin nhắn */}
        <article className="message-area">
          <MessageView
            messages={messages}
            currentUserId={user?.id || -1}
            onRecall={handleRecall} // ◀ EDIT: truyền callback recall
          />
          <MessageInput onSend={handleSend} />
        </article>
      </div>
    </main>
  );
}

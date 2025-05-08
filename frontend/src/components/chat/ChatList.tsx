import ChatItem from "./ChatItem";
import api from "../../api/axiosConfig";
import { useEffect } from "react";
import { useState } from "react";
import { ChatListItemDTO } from "../../interfaces/ChatListItemDTO";

export default function ChatList() {
  const [chatList, setChatList] = useState<ChatListItemDTO[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);

  useEffect(() => {
    api
      .get<ChatListItemDTO[]>("/api/chats")
      .then((res) => {
        setChatList(res.data);
      })
      .catch((err) => {
        console.error("❌ Lỗi lấy danh sách chat:", err);
      });
  }, []);

  const handleSelectChat = (chatId: number) => {
    setSelectedChatId(chatId);
  };

  return (
    <div id="chat-list">
      {chatList.map((chat) => (
        <ChatItem
          key={chat.chatId}
          chat={{
            chatId: chat.chatId,
            chatName: chat.displayName,
            chatAvt: chat.avatarUrl || "https://picsum.photos/id/237/200/300",
            chatType: "PRIVATE", // mặc định vì đây là private
            createdBy: chat.targetUserId,
            createdAt: new Date(chat.lastMessageAt || Date.now()),
          }}
          isSelected={chat.chatId === selectedChatId}
          onSelect={handleSelectChat}
        />
      ))}
    </div>
  );
}

import { useEffect, useState } from "react";
import { ChatListItemDTO } from "../../interfaces/ChatListItemDTO";
import { getChats } from "../../api/apiChat";
import ChatItem from "./ChatItem";
import "./ChatList.css";

export default function ChatList({
  onSelectContact,
  selectedChatId, // ✅ nhận từ SideBar để highlight chat tương ứng
}: {
  onSelectContact: (selectedChat: ChatListItemDTO) => void;
  selectedChatId: number | null;
}) {
  const [chatList, setChatList] = useState<ChatListItemDTO[]>([]);

  useEffect(() => {
    getChats()
      .then(setChatList)
      .catch((err) => {
        console.error("❌ Lỗi lấy danh sách chat:", err);
      });
  }, []);

  const handleSelectChat = (chat: ChatListItemDTO) => {
    onSelectContact(chat); // gửi chat ra ngoài
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
            chatType: "PRIVATE",
            createdBy: chat.targetUserId,
            createdAt: new Date(chat.lastMessageAt || Date.now()),
          }}
          isSelected={chat.chatId === selectedChatId} // ✅ so sánh prop truyền xuống
          onSelect={() => handleSelectChat(chat)}
        />
      ))}
    </div>
  );
}

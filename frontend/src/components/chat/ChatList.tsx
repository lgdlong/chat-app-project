import ChatItem from "./ChatItem";
import { Chat } from "../../interfaces/Chat";
import { useState } from "react";

export default function ChatList() {
  const chatAvtDefault = "https://picsum.photos/id/237/200/300";

  const chatList: Chat[] = [
    {
      chatId: 1,
      chatAvt: chatAvtDefault,
      chatType: "PRIVATE",
      chatName: "Phung Luu Hoang Long",
      createdBy: 1,
      createdAt: new Date(),
    },
    {
      chatId: 2,
      chatAvt: chatAvtDefault,
      chatType: "GROUP",
      chatName: "Group Chat",
      createdBy: 2,
      createdAt: new Date(),
    },
    {
      chatId: 3,
      chatAvt: chatAvtDefault,
      chatType: "PRIVATE",
      chatName: "John Doe",
      createdBy: 3,
      createdAt: new Date(),
    },
    {
      chatId: 4,
      chatAvt: chatAvtDefault,
      chatType: "GROUP",
      chatName: "Family Group",
      createdBy: 4,
      createdAt: new Date(),
    },
    {
      chatId: 5,
      chatAvt: chatAvtDefault,
      chatType: "PRIVATE",
      chatName: "Jane Smith",
      createdBy: 5,
      createdAt: new Date(),
    },
  ];

  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);

  const handleSelectChat = (chatId: number) => {
    setSelectedChatId(chatId);
  };

  return (
    <div id="chat-list">
      {chatList.map((chat) => (
        <ChatItem
          key={chat.chatId}
          chat={chat}
          isSelected={chat.chatId === selectedChatId}
          onSelect={handleSelectChat}
        />
      ))}
    </div>
  );
}

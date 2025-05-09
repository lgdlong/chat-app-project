import "../css/variables.css";

import { useState } from "react";
import SideBar from "../components/sidebar/SideBar";
import ChatView from "../components/chat/ChatView";
// import { useUser } from "../hooks/useUser";
import { UserResponseDTO } from "../interfaces/UserResponseDTO";
import { ChatListItemDTO } from "../interfaces/ChatListItemDTO";
// import { MessageDTO } from "../interfaces/MessageDTO";
import api from "../api/axiosConfig";

export default function HomePage() {
  // const { user } = useUser(); // Nếu cần lấy thông tin người dùng
  // const [selectedUser, setSelectedUser] = useState<UserResponseDTO | null>(
  //   null
  // );
  const [selectedChat, setSelectedChat] = useState<ChatListItemDTO | null>(
    null
  );
  // const [messages, setMessages] = useState<MessageDTO[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  /**
   * Hàm nhận user được chọn từ SideBar và tạo chat mới
   * Gọi API để tạo chat mới
   *
   * @param selectedContact
   *
   */
  const handleContactSelect = async (selectedContact: UserResponseDTO) => {
    try {
      setIsLoading(true);
      const chatRes = await api.post("/api/chats/private", {
        targetUserId: selectedContact.id,
      });

      const chat: ChatListItemDTO = chatRes.data;

      setSelectedChat(chat);
    } catch (err) {
      console.error("Error creating or fetching chat:", err);
      // Optionally, display an error message to the user here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="d-flex flex-row">
      <SideBar onSelectContact={handleContactSelect} />
      {/* {selectedChat && <ChatView chat={selectedChat} messages={messages} />} */}
      {isLoading ? (
        <div className="chat-loading">Loading chat...</div>
      ) : (
        selectedChat && <ChatView chat={selectedChat} />
      )}
    </div>
  );
}

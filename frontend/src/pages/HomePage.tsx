import "../css/variables.css";

import { useState } from "react";
import SideBar from "../components/sidebar/SideBar";
import ChatView from "../components/chat/ChatView";
// import { useUser } from "../hooks/useUser";
import { UserResponseDTO } from "../interfaces/UserResponseDTO";
import { ChatListItemDTO } from "../interfaces/ChatListItemDTO";
// import { MessageDTO } from "../interfaces/MessageDTO";
import api from "../api/axiosConfig"; // Đường dẫn đến file api.js hoặc api.ts

export default function HomePage() {
  // const { user } = useUser(); // Nếu cần lấy thông tin người dùng
  // const [selectedUser, setSelectedUser] = useState<UserResponseDTO | null>(
  //   null
  // );
  const [selectedChat, setSelectedChat] = useState<ChatListItemDTO  | null>(
    null
  );
  // const [messages, setMessages] = useState<MessageDTO[]>([]);

  /**
   * Hàm nhận user được chọn từ SideBar và tạo chat mới
   * Gọi API để tạo chat mới
   *
   * @param selectedContact
   *
   *
   *
   *
   *
   *
   */
  const handleContactSelect = async (selectedContact: UserResponseDTO) => {
    try {
      const chatRes = await api.post("/api/chats/private", {
        targetUserId: selectedContact.id,
      });

      console.log("✅ Tạo chat thành công", chatRes.data);

      const chat: ChatListItemDTO  = chatRes.data;

      // const msgRes = await api.get(`/api/chats/${chat.id}/messages`);
      setSelectedChat(chat);
      console.log("✅ setSelectedChat() thành công", chat);
      // setMessages(msgRes.data);
    } catch (err) {
      console.error(
        "❌ Lỗi khi tạo hoặc lấy chat trong handleContactSelect",
        err
      );
    }
  };

  return (
    <div className="d-flex flex-row">
      <SideBar onSelectContact={handleContactSelect} />
      {/* {selectedChat && <ChatView chat={selectedChat} messages={messages} />} */}
      {selectedChat && <ChatView chat={selectedChat} />}
    </div>
  );
}

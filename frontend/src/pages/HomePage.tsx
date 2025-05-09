import "../css/variables.css";
import { useState } from "react";
import SideBar from "../components/sidebar/SideBar";
import ChatView from "../components/chat/ChatView";
import { ChatListItemDTO } from "../interfaces/ChatListItemDTO";

export default function HomePage() {
  // Trạng thái lưu chat hiện được chọn
  const [selectedChat, setSelectedChat] = useState<ChatListItemDTO | null>(
    null
  );

  // Trạng thái hiển thị loading khi chuyển chat (nếu sau này cần fetch messages)
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Hàm callback được gọi khi user chọn một chat
   * - Có thể là chat sẵn có trong ChatList
   * - Hoặc là chat vừa được tạo mới từ ContactResult
   */
  const handleChatSelect = (chat: ChatListItemDTO) => {
    setIsLoading(true); // có thể dùng cho hiển thị loading nếu cần load message sau này

    // Gán chat được chọn
    setSelectedChat(chat);

    // Nếu cần load message có thể thêm logic tại đây
    // Ví dụ: fetchMessages(chat.chatId).then(...)

    setIsLoading(false);
  };

  return (
    <div className="d-flex flex-row">
      {/* Sidebar bên trái chứa avatar, tìm kiếm và danh sách chat */}
      <SideBar onSelectChat={handleChatSelect} />

      {/* Khu vực hiển thị đoạn chat đã chọn */}
      {isLoading ? (
        <div className="chat-loading">Loading chat...</div>
      ) : (
        selectedChat && <ChatView chat={selectedChat} />
      )}
    </div>
  );
}

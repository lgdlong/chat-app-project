import "../../css/variables.css";
import "./SideBar.css";
import ContactSearch from "../search/ContactSearch";
import ChatList from "../chat/ChatList";
import { useUser } from "../../hooks/useUser";
import LogoutButton from "../LogoutButton";
import { useState } from "react";
import UserProfile from "../profile/UserProfile";
import ContactResult from "../search/ContactResult";
import { UserResponseDTO } from "../../interfaces/UserResponseDTO";
import { ChatListItemDTO } from "../../interfaces/ChatListItemDTO";
import SettingButton from "./SettingButton";
import { mapUserToUserProfileProps } from "../../mappers/userMapper";
import { createOrGetPrivateChat } from "../../api/apiChat";

export default function SideBar({
  onSelectChat, // Hàm callback để gửi chat đã chọn về HomePage
}: {
  onSelectChat: (chat: ChatListItemDTO) => void;
}) {
  const { user, setUser  } = useUser(); // Lấy thông tin user đang đăng nhập
  const [showModal, setShowModal] = useState(false); // Hiển thị modal profile
  const [selectedContact, setSelectedContact] =
    useState<UserResponseDTO | null>(null); // Người dùng được chọn từ tìm kiếm
  const [isOnFocus, setIsOnFocus] = useState(false); // Trạng thái focus ô tìm kiếm
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);

  // Mở modal user profile
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  /**
   * ✅ Khi chọn một người dùng từ kết quả tìm kiếm:
   * Gọi API tạo/lấy đoạn chat 1-1 tương ứng và trả về ChatListItemDTO cho HomePage
   */
  const handleSelectContact = async (user: UserResponseDTO) => {
    try {
      const chat = await createOrGetPrivateChat(user.id); // Gọi API backend tạo/lấy chat
      setSelectedChatId(chat.chatId); // ✅ update ID để highlight
      onSelectChat(chat); // Trả về ChatListItemDTO (dùng cho ChatView)
    } catch (err) {
      console.error("❌ Không thể tạo hoặc lấy chat:", err);
    } finally {
      // Reset trạng thái tìm kiếm
      setIsOnFocus(false);
      setSelectedContact(null);
    }
  };

  return (
    <>
      <nav id="sidebarNav" className="d-flex flex-row">
        {/* Cột trái: avatar user + các nút */}
        <div
          id="main-tab"
          className="d-flex flex-column justify-content-between align-items-center"
        >
          <div id="user-info">
            <img
              className="profile-img"
              onClick={openModal}
              src={user?.picUrl || "https://picsum.photos/id/237/200/300"}
              alt="User Avatar"
            />
          </div>

          <div className="d-flex flex-column align-items-start gap-3 mb-2 px-2">
            <SettingButton />
            <LogoutButton />
          </div>
        </div>

        {/* Cột phải: danh sách chat hoặc kết quả tìm kiếm */}
        <div className="chat-list-container d-flex flex-column">
          {/* Ô tìm kiếm liên hệ */}
          <ContactSearch
            onResult={setSelectedContact} // Gán kết quả tìm kiếm
            isOnFocus={setIsOnFocus} // Theo dõi trạng thái focus
          />

          {/* Nếu đang tìm thì hiển thị ContactResult, ngược lại hiển thị ChatList */}
          {isOnFocus ? (
            <ContactResult
              contact={selectedContact}
              isSelected={!!selectedContact}
              onSelect={handleSelectContact} // ✅ Gọi API tạo chat → trả về ChatListItemDTO
            />
          ) : (
            <ChatList
              onSelectContact={(chat) => {
                setSelectedChatId(chat.chatId);
                onSelectChat(chat);
              }}
              selectedChatId={selectedChatId}
            />
          )}
        </div>
      </nav>

      {/* Modal hiển thị profile người dùng đang đăng nhập */}
      {user && (
        <UserProfile
          show={showModal}
          onClose={closeModal}
          user={mapUserToUserProfileProps(user)}
          onUserUpdated={(updatedProfile) => {
            // cập nhật lại context, UI sẽ tự re-render
            setUser({
              ...user,
              ...updatedProfile
            });
          }}
        />
      )}
    </>
  );
}

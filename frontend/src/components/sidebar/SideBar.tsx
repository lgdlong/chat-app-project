import "../../css/variables.css";
import "./SideBar.css";
import ContactSearch from "../search/ContactSearch";
import ChatList from "../chat/ChatList";
import { useUser } from "../../hooks/useUser";
import LogoutButton from "../LogoutButton";
import { useState } from "react";
import UserProfile from "../profile/UserProfile";
import ContactResult from "../search/ContactResult";
import { UserResponseDTO } from "../../interfaces/UserResponseDTO"; // hoặc bạn có Contact type riêng
import SettingButton from "./SettingButton";

export default function SideBar() {
  const { user } = useUser();
  const [showModal, setShowModal] = useState(false);
  const [selectedContact, setSelectedContact] =
    useState<UserResponseDTO | null>(null);
  const [isOnFocus, setIsOnFocus] = useState(false); // thêm state để theo dõi trạng thái focus của input

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <>
      <nav id="sidebarNav" className="d-flex flex-row">
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

        <div className="chat-list-container d-flex flex-column">
          <ContactSearch
            onResult={setSelectedContact}
            isOnFocus={setIsOnFocus}
          />
          {isOnFocus ? (
            <ContactResult
              contact={selectedContact}
              isSelected={!!selectedContact}
              onSelect={(id) => {
                console.log("Start chat with", id);
              }}
            />
          ) : (
            <ChatList />
          )}
        </div>
      </nav>

      {user && (
        <UserProfile show={showModal} onClose={closeModal} user={user} />
      )}
    </>
  );
}
// Chú ý: Đoạn mã này giả định rằng bạn đã có các component và hook cần thiết như useUser, UserProfile, ContactSearch, ChatList, LogoutButton, SettingButton
// và các kiểu dữ liệu như UserResponseDTO. Bạn cần điều chỉnh lại cho phù hợp với cấu trúc dự án của bạn.

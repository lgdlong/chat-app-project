// import { Form, Button } from "react-bootstrap";
import "../../css/variables.css";
import "./SideBar.css";
import ContactSearch from "../search/ContactSearch";
import ChatList from "../chat/ChatList";
import { useUser } from "../../context/UserContext"; // ← thêm dòng này
import LogoutButton from "../LogoutButton";
//import { useNavigate } from "react-router-dom";
import { useState } from "react";
import UserProfile from "../profile/UserProfile";
import SettingButton from "./SettingsInfo";

export default function SideBar() {
  //const navigate = useNavigate();
  const { user } = useUser();
  const [showModal, setShowModal] = useState(false);

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
              src={user?.picUrl || "https://via.placeholder.com/150"}
              alt="User Avatar"
              style={{ cursor: "pointer" }}
            />
          </div>

          <div className="d-flex flex-column align-items-start gap-3 mb-2 px-2">

            <SettingButton />
            <LogoutButton />
          </div>
        </div>
        <div className="chat-list-container d-flex flex-column">
          <ContactSearch />
          <ChatList />
        </div>
      </nav>

      {user && (
        <UserProfile show={showModal} onClose={closeModal} user={user} />
      )}
    </>
  );
}

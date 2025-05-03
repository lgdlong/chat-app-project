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
          <LogoutButton />
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

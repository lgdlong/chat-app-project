// import { Form, Button } from "react-bootstrap";
import "../../css/variables.css";
import "./SideBar.css";
import ContactSearch from "../search/ContactSearch";
import ChatList from "../chat/ChatList";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext"; // ← thêm dòng này
import LogoutButton from "../LogoutButton";

export default function SideBar() {
  const navigate = useNavigate();
  const { user } = useUser(); // ← dùng user từ context

  const goToProfile = () => {
    navigate("/profile");
  };

  return (
    <nav id="sidebarNav" className="d-flex flex-row">
      <div
        id="main-tab"
        className="d-flex flex-column justify-content-between align-items-center"
      >
        <div id="user-info">
          <img
            className="profile-img"
            onClick={goToProfile}
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
  );
}

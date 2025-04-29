// import { Form, Button } from "react-bootstrap";
import "../css/variables.css";
import "./SideBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import ContactSearch from "./ContactSearch";
import ChatList from "./ChatList";

export default function SideBar() {
  interface User {
    id: number;
    displayName: string;
    username: string;
    email: string;
    phone: string;
    picUrl: string;
  }

  const user: User = {
    id: 1,
    displayName: "Phung Luu Hoang Long",
    username: "lgdlong",
    email: "phungluuhoanglong@gmail.com",
    phone: "0123456789",
    picUrl: "https://picsum.photos/id/237/200/300",
  };

  return (
    <nav id="sidebarNav" className="d-flex flex-row">
      <div
        id="main-tab"
        className="d-flex flex-column justify-content-between align-items-center"
      >
        <div id="user-info">
          <img className="profile-img" src={user.picUrl} alt="User Avatar" />
        </div>
        <div className="leftbar-tab d-flex justify-content-center align-items-center">
          <FontAwesomeIcon
            icon={faArrowRightFromBracket}
            id="logout-btn"
            color="white"
          />
        </div>
      </div>
      <div className="chat-list-container d-flex flex-column">
        <ContactSearch />
        <ChatList />
      </div>
    </nav>
  );
}

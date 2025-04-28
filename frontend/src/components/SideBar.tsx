// import { Form, Button } from "react-bootstrap";
import "../css/variables.css";
import "./SideBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";

export default function SideBar() {
  const [inputValue, setInputValue] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
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
            // className="mb-4"
          />
        </div>
      </div>
      <div className="chat-list-container d-flex flex-row ">
        <div id="contact-search">
          <div className="search-bar d-flex align-items-center">
            <FontAwesomeIcon icon={faMagnifyingGlass} id="search-icon" />
            <Form.Control
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              placeholder="Search..."
              id="contact-search-input"
              className="no-border-input"
            />
          </div>
          {(inputFocused || inputValue.length > 0) && (
            <Button
              id="close-list-btn"
              className="d-flex justify-content-center align-items-center"
              onClick={() => setInputValue("")}
            >
              Close
            </Button>
          )}
        </div>
        <div id="conversationListId"></div>
      </div>
    </nav>
  );
}

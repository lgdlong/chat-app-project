import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Form, Button } from "react-bootstrap";
import "./ContactSearch.css";

export default function ContactSearch() {
  const [inputValue, setInputValue] = useState("");
  const [inputFocused, setInputFocused] = useState(false);

  return (
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
  );
}

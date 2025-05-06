import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Form, Button } from "react-bootstrap";
import { searchUser } from "../../api/apiUser";
import { UserResponseDTO } from "../../interfaces/UserResponseDTO";
import "./ContactSearch.css";

interface ContactSearchProps {
  onResult: (user: UserResponseDTO | null) => void;
  isOnFocus: (inputFocused: boolean) => void;
}

export default function ContactSearch({ onResult, isOnFocus }: ContactSearchProps) {
  const [inputValue, setInputValue] = useState("");
  const [inputFocused, setInputFocused] = useState(false);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (inputValue.trim()) {
        searchUser(inputValue)
          .then((user) => onResult(user))
          .catch(() => onResult(null)); // nếu không tìm thấy hoặc lỗi → null
      } else {
        onResult(null);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [inputValue, onResult]);


  return (
    <div id="contact-search">
      <div className="search-bar d-flex align-items-center">
        <FontAwesomeIcon icon={faMagnifyingGlass} id="search-icon" />
        <Form.Control
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => {
            setInputFocused(true);
            isOnFocus(true); // 👈 thêm dòng này
          }}
          onBlur={() => {
            setInputFocused(false);
            isOnFocus(false); // 👈 thêm dòng này
          }}
          placeholder="Search..."
          id="contact-search-input"
          className="no-border-input"
        />
      </div>

      {(inputFocused || inputValue.length > 0) && (
        <Button
          id="close-list-btn"
          className="d-flex justify-content-center align-items-center"
          onClick={() => {
            setInputValue("");
            onResult(null);
          }}
        >
          Close
        </Button>
      )}
    </div>
  );
}

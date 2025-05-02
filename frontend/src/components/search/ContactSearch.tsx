import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Form, Button } from "react-bootstrap";
import { searchUser } from "../../api/apiUser";
import { UserResponseDTO } from "../../interfaces/UserResponseDTO";
import "./ContactSearch.css";

export default function ContactSearch() {
  const [inputValue, setInputValue] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  const [userResult, setUserResult] = useState<UserResponseDTO | null>(null);

  // Debounce logic
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (inputValue.trim()) {
        searchUser(inputValue).then(setUserResult);
      } else {
        setUserResult(null);
      }
    }, 300); // ⏳ 300ms chờ user dừng gõ

    return () => clearTimeout(delayDebounce);
  }, [inputValue]);

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
          onClick={() => {
            setInputValue("");
            setUserResult(null);
          }}
        >
          Close
        </Button>
      )}

      {/* Hiển thị kết quả tìm được (nếu có) */}
      {userResult && (
        <div className="search-result">
          <p>
            {userResult.username} ({userResult.phone})
          </p>
        </div>
      )}
    </div>
  );
}

import { Row, Col, Container } from "react-bootstrap";
import { ChatItemProps } from "../../interfaces/ChatItemProps";
import "./ChatItem.css";
import "../../css/variables.css";

export default function ChatItem({
  chat,
  isSelected,
  onSelect,
}: ChatItemProps) {
  return (
    <Container
      id="chat-item"
      className={`chat-item ${isSelected ? "selected" : ""}`}
      onClick={() => onSelect(chat.chatId)}
    >
      <Row className="align-items-center">
        {/* Avatar */}
        <Col
          md={2}
          className="avt-container d-flex justify-content-center align-items-center"
        >
          <img src={chat.chatAvt} alt="Avatar" className="avatar" />
        </Col>

        {/* Chat Info */}
        <Col md={9}>
          <Row className="d-flex flex-column">
            {/* Chat Name - chiếm 50% */}
            <Col>
              <h2 className="chat-name">{chat.chatName}</h2>
            </Col>

            {/* Chat Type - chiếm 50% */}
            <Col>
              <p className="chat-type">{chat.chatType}</p>
            </Col>
          </Row>
        </Col>

        {/* Created By */}
        <Col md={1}>
          <div className="chat-id">{chat.createdBy}</div>
        </Col>
      </Row>
    </Container>
  );
}

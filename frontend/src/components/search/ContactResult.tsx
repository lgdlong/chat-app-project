import { Container, Col, Row } from "react-bootstrap";
import { ContactResultProps } from "../../interfaces/ContactResultProps";
import "./ContactResult.css"; // nếu có CSS riêng cho phần rỗng

export default function ContactResult({
  contact,
  onSelect,
  isSelected,
}: ContactResultProps) {
  // Khi không tìm thấy người dùng
  if (!contact) {
    return (
      <div className="search-result-empty d-flex justify-content-center align-items-center p-3">
        <p className="text-muted mb-0">Không tìm thấy người dùng.</p>
      </div>
    );
  }

  // Khi tìm thấy user
  return (
    <Container
      id="chat-item"
      className={`chat-item ${isSelected ? "selected" : ""}`}
      onClick={() => onSelect(contact.id)}
    >
      <Row className="align-items-center">
        {/* Avatar */}
        <Col
          md={2}
          className="avt-container d-flex justify-content-center align-items-center"
        >
          <img src={contact.picUrl} alt="Avatar" className="avatar" />
        </Col>

        {/* Chat Info */}
        <Col md={9}>
          <Row className="d-flex flex-column">
            {/* Tên hiển thị */}
            <Col>
              <h2 className="chat-name">{contact.displayName}</h2>
            </Col>

            {/* Số điện thoại */}
            <Col>
              <p className="chat-type">{contact.phone}</p>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

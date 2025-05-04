import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
import { UserProfile } from "../../interfaces/UserProfile";

interface Props {
  show: boolean;
  onClose: () => void;
  onSubmit: (updatedData: any) => void;
  user: UserProfile;
}

export default function UpdateProfile({ show, onClose, onSubmit, user }: Props) {
  const [displayName, setDisplayName] = useState(user.displayName);
  const [username, setUsername] = useState(user.username);
  const [email] = useState(user.email); // disabled, nên không cần set lại

  const handleSubmit = () => {
    onSubmit({ displayName, username, email });
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Profile</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Display Name</Form.Label>
            <Form.Control
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Username (30 days / 1 time)</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email (30 days / 1 time)</Form.Label>
            <Form.Control type="email" value={email} disabled />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

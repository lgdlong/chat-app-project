import { useRef, useState } from "react";
import { UserFullProps } from "../../interfaces/UserFullProps";
import { AdminUserUpdate } from "../../interfaces/AdminUserUpdate";
import { Button, Form, Modal } from "react-bootstrap";
import { UserStatus } from "../../enums/UserEnums";

interface UserEditFormProps {
  user: UserFullProps;
  onCancel: () => void;
  onSave: (data: AdminUserUpdate) => void;
}

export default function UserEditForm({
  user,
  onCancel,
  onSave,
}: UserEditFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingUpdateData, setPendingUpdateData] =
    useState<AdminUserUpdate | null>(null);

  const handleSubmit = () => {
    const data = new FormData(formRef.current!);
    const updateData: AdminUserUpdate = {
      username: user.username,
      displayName: data.get("displayName") as string,
      email: user.email,
      phone: user.phone,
      picUrl: (data.get("avatarUrl") as string) || undefined,
      status: data.get("status") as UserStatus,
    };

    if (updateData.status === "BANNED" && user.status !== "BANNED") {
      setPendingUpdateData(updateData);
      setShowConfirmModal(true);
      return;
    }

    onSave(updateData);
  };

  const handleConfirmStatusChange = () => {
    if (pendingUpdateData) {
      onSave(pendingUpdateData);
    }
    setShowConfirmModal(false);
  };

  return (
    <div className="user-edit-overlay">
      <div className="user-edit-form bg-light p-4 shadow rounded">
        <h4>Update User: {user.username}</h4>
        <Form ref={formRef} className="mt-3">
          <Form.Group className="mb-2">
            <Form.Label>Display Name</Form.Label>
            <Form.Control name="displayName" defaultValue={user.displayName} />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={user.email} readOnly disabled />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Phone</Form.Label>
            <Form.Control value={user.phone} readOnly disabled />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Avatar URL</Form.Label>
            <Form.Control name="avatarUrl" defaultValue={user.avatarUrl} />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Status</Form.Label>
            <Form.Select name="status" defaultValue={user.status}>
              <option value="ACTIVE">Active</option>
              <option value="BANNED">Banned</option>
            </Form.Select>
          </Form.Group>

          <div className="d-flex justify-content-end gap-2 mt-3">
            <Button variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Save
            </Button>
          </div>
        </Form>
      </div>

      {/* Modal xác nhận ban user */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm User Ban</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to ban user <strong>{user.username}</strong>?{" "}
          This will prevent them from using the application.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmStatusChange}>
            Yes, Ban User
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

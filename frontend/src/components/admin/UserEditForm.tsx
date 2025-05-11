import { useRef } from "react";
import { UserFullProps } from "../../interfaces/UserFullProps";
import { AdminUserUpdate } from "../../interfaces/AdminUserUpdate";
import { Button, Form } from "react-bootstrap";
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

  const handleSubmit = () => {
    const data = new FormData(formRef.current!);
    const updateData: AdminUserUpdate = {
      username: user.username, // giữ nguyên username
      displayName: data.get("displayName") as string,
      email: user.email, // giữ nguyên email
      phone: user.phone, // giữ nguyên phone
      picUrl: (data.get("avatarUrl") as string) || undefined,
      status: (data.get("status") as UserStatus) || undefined,
    };
    onSave(updateData);
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
    </div>
  );
}

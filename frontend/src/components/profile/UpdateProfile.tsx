import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
import { UserProfileProps } from "../../interfaces/UserProfileProps";
import { useEffect } from "react";
import { updateMyProfile } from "../../api/apiUser";

interface Props {
    show: boolean;
    onClose: () => void;
    // giờ chỉ nhận 4 field, 2 field kia (picUrl, role) để sau bổ sung
    // giờ onSubmit nhận về toàn bộ UserProfileProps sau khi update thành công
    onSubmit: (updatedData: UserProfileProps) => void;
    user: UserProfileProps;
}


export default function UpdateProfile({ show, onClose, onSubmit, user }: Props) {
    const [displayName, setDisplayName] = useState(user.displayName);
    const [username, setUsername] = useState(user.username);
    const [phone, setPhone] = useState(user.phone);
    const [email] = useState(user.email); // giữ nguyên để không cho sửa
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (show) {
            setIsSubmitting(false);
            // reset form fields khi mở lại
            setDisplayName(user.displayName);
            setUsername(user.username);
            setPhone(user.phone);
        }
    }, [show, user]);


    const handleSubmit = async () => {
        if (isSubmitting) return;

        if (!displayName.trim()) {
            alert('Display name cannot be empty');
            return;
        }

        // Validate display name: maximum 5 words and 50 characters
        const words = displayName.trim().split(/\s+/);
        if (words.length > 5) {
            alert('Display name cannot have more than 5 words');
            return;
        }

        if (displayName.length > 50) {
            alert('Display name cannot exceed 50 characters');
            return;
        }


        if (!username.trim()) {
            alert('Username cannot be empty');
            return;
        }

        // Username format validation - example: alphanumeric with underscores only
        if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            alert('Username can only contain letters, numbers, and underscores');
            return;
        }

        if (!phone.trim()) {
            alert('Phone number cannot be empty');
            return;
        }

        // Phone number format validation - adjust regex for your requirements
        if (!/^\+?[0-9]{10,15}$/.test(phone.replace(/\s/g, ''))) {
            alert('Please enter a valid phone number');
            return;
        }

        setIsSubmitting(true);
        try {
            // 🆕 Gọi API PUT /api/users/{id}
            const updated = await updateMyProfile({
                displayName,
                username,
                phone,
                email,
            });
            // 🆕 Thông báo thành công
            alert("Profile updated successfully");
            // 🆕 Trả dữ liệu mới về parent để cập nhật UI
            onSubmit(updated);
            onClose();
        } catch (err) {
            console.error("Error updating profile:", err);
            alert("Failed to update profile. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
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
                        <Form.Label>Phone (can't change)</Form.Label>
                        <Form.Control
                            type="text"
                            value={phone} disabled
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email (can't change)</Form.Label>
                        <Form.Control type="email" value={email} disabled />
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? 'Updating...' : 'Update'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

import { Modal } from "react-bootstrap";
import styles from "./UserProfile.module.css";
import UpdateProfile from "./UpdateProfile";
import { UserProfileProps } from "../../interfaces/UserProfileProps";
import { useState } from "react";
import { updateMyProfile } from "../../api/apiUser";

interface Props {
  user: UserProfileProps;
  show: boolean;
  onClose: () => void;
  onUserUpdated: (updated: UserProfileProps) => void;
}

export default function UserProfileModal({ user, show, onClose, onUserUpdated }: Props) {
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const handleUpdate = async (updatedData: {
    displayName: string;
    username: string;
    phone: string;
    email: string
  }) => {
    try {
      // 1) Gọi API
      const updatedUser = await updateMyProfile(updatedData);
      // 2) Đẩy kết quả về parent để cập nhật UI
      onUserUpdated(updatedUser);
    } catch (err) {
      alert("Failed to update profile");
      console.error(err);
    } finally {
      setShowUpdateModal(false);
    }
  };

  return (
    <>
      <Modal show={show} onHide={onClose} centered dialogClassName={styles['user-profile-modal']}>
        <div className={styles['user-profile-container']}>

          {/* Header */}
          <div className={styles['header']}>
            <div className={styles['header-left']}>
              <span className={styles['title']}>Profile</span>
            </div>
            <button className={styles['close-btn']} onClick={onClose}>×</button>
          </div>

          {/* Avatar */}

          <div className={styles['avatar-section']}>
            <div className={styles['avatar-wrapper']}>
              <img className={styles['avatar']} src={user.picUrl} alt="avatar" />
              <span
                className={`${styles['status-indicator']} ${styles[user.status ?? 'offline']
                  }`}
                title={user.status ?? 'offline'}
              />
            </div>
          </div>


          {/* Info */}
          <div className={styles['info-section']}>
            <h3 className={styles['display-name']}>{user.displayName}</h3>
            <p className={styles['username']}>@{user.username}</p>
          </div>

          {/* Personal Info Section */}
          <div className={styles['user-details']}>
            <h5 className="fw-bold mb-3">Personal Information</h5>
            <div><strong>Phone:</strong> {user.phone || 'Not provided'}</div>
            <div><strong>Email:</strong> {user.email}</div>
            <div><strong>Account Created:</strong> {user.createdAt
              ? new Date(user.createdAt).toLocaleDateString('en-GB')
              : 'Unknown'}
            </div>
          </div>

          {/* Update Button */}
          <div className={styles['update-btn-wrapper']}>
            <button
              className="btn btn-outline-primary"
              onClick={() => setShowUpdateModal(true)}
            >
              ✎ Cập nhật
            </button>
          </div>
        </div>
      </Modal>

      {/* Update Profile Modal */}
      <UpdateProfile
        show={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        onSubmit={handleUpdate} // ← handleUpdate chứa API call + onUserUpdated
        user={user}
      />

    </>


  );
}


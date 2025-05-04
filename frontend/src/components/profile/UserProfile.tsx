import { Modal } from "react-bootstrap";
import styles from "./UserProfile.module.css";
import { UserProfile } from "../../interfaces/UserProfile";
import UpdateProfile from "./UpdateProfile";
import { useState } from "react";



interface Props {
  user: UserProfile;
  show: boolean;
  onClose: () => void;
}

export default function UserProfileModal({ user, show, onClose }: Props) {
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const handleUpdate = (updatedData: any) => {
    console.log("Dữ liệu cập nhật:", updatedData);
    setShowUpdateModal(false);
    //   // TODO: Gọi API cập nhật nếu cần
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
              <span className={`${styles['status-indicator']} ${styles[user.status]}`} />
            </div>
          </div>


          {/* Info */}
          <div className={styles['info-section']}>
            <h3 className={styles['display-name']}>{user.displayName}</h3>
            <p className={styles['username']}>@{user.username}</p>
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
        onSubmit={handleUpdate}
        user={user}
      />

    </>


  );
}


import { Modal } from "react-bootstrap";
import styles from "./UserProfile.module.css";
import { UserProfile } from "../../interfaces/UserProfile";

interface Props {
  user: UserProfile;
  show: boolean;
  onClose: () => void;
}

export default function UserProfileModal({ user, show, onClose }: Props) {
  return (
    <Modal show={show} onHide={onClose} centered dialogClassName={styles['user-profile-modal']}>
      <div className={styles['user-profile-container']}>
        <div className={styles['cover-image']} style={{ backgroundImage: `url(${user.picUrl})` }}>
          <button className={styles['close-btn']} onClick={onClose}>×</button>
        </div>
        <div className={styles['avatar-section']}>
          <img className={styles['avatar']} src={user.picUrl} alt="avatar" />
        </div>
        <div className={styles['info-section']}>
          <h4 className={styles['username']}>{user.displayName}</h4>
          <p className={styles['email']}>{user.email}</p>
        </div>

        {/* button update rỗng  */}
        <div className={styles['update-btn-wrapper']}>
          <button className="btn btn-outline-primary">
            ✎ Cập nhật  
          </button>
        </div>
      </div>
    </Modal>
  );
}


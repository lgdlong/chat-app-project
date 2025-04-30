import { UserProfile as UserProfileType } from "../../interfaces/UserProfile";
import styles from "./UserProfile.module.css";


interface Props {
  user: UserProfileType;
}

export default function UserProfile({ user }: Props) {
  return (
    <div className="container text-center">
    <div className={styles["cover-photo"]} />
    <div className={styles["profile-header"]}>
      <img
        className={styles.avatar}
        src={user.picUrl || "https://via.placeholder.com/150"}
        alt="avatar"
      />
      <h2 className="mt-3">{user.username}</h2>
    </div>
    <p><strong>Email:</strong> {user.email}</p>
  </div>
  );
}

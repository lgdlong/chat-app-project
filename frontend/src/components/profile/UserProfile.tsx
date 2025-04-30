import { UserProfile as UserProfileType } from "../../interfaces/UserProfile";
import "./UserProfile.css";

interface Props {
  user: UserProfileType;
}

export default function UserProfile({ user }: Props) {
  return (
    <div className="container text-center">
      <div className="cover-photo" />
      <div className="profile-header">
        <img
          className="avatar"
          src={user.picUrl || "https://via.placeholder.com/150"}
          alt="avatar"
        />
        <h2 className="mt-3">{user.username}</h2>
      </div>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
}

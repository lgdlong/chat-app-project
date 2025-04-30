import { useUser } from "../../context/UserContext";
import "./UserProfile.css";
export default function ProfilePage() {
  const { user } = useUser();

  if (!user) return <p>Đang tải thông tin...</p>;

  return (
    <div className="container mt-4 text-center">
      <div className="cover-photo" />
      {/* <h2>Thông tin cá nhân</h2> */}

      <div className="profile-header">
        <img
          src={user.picUrl || "https://via.placeholder.com/150"} //default
          alt="avatar"
          className="avatar"
        />
        <h2 className="mt-3">{user.displayName}</h2>
      </div>

      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>

      {/* <p><strong>Bio:</strong> {user.bio}</p> */}
      {/* <p><strong>Ngày tạo:</strong> {new Date(user.createdAt).toLocaleDateString()}</p> */}
    </div>
  );
}

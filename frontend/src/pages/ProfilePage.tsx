// src/pages/ProfilePage.tsx
import { useUser } from "../context/UserContext";

export default function ProfilePage() {
  const { user } = useUser();

  if (!user) return <p>Đang tải thông tin...</p>;

  return (
    <div className="container mt-4">
      <h2>Thông tin cá nhân</h2>
      <img
        src={user.picUrl || "https://via.placeholder.com/150"}
        alt="avatar"
        style={{ width: "150px", borderRadius: "50%" }}
      />
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      {/* <p><strong>Bio:</strong> {user.bio}</p> */}
      {/* <p><strong>Ngày tạo:</strong> {new Date(user.createdAt).toLocaleDateString()}</p> */}
    </div>
  );
}

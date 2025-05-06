import { useUser } from "../hooks/useUser";
import UserProfile from "../components/profile/UserProfile";
import { useState } from "react";
import { User } from "../interfaces/User";
import { UserProfileProps } from "../interfaces/UserProfileProps";

// dọn sau

export default function ProfilePage() {
  const { user } = useUser();
  const [showPopup, setShowPopup] = useState(true);

  if (!user) return <p>Đang tải thông tin...</p>;

  // Tách hàm map ra cho rõ ràng
  const toUserProfile = (user: User): UserProfileProps => ({
    displayName: user.displayName,
    username: user.username,
    email: user.email,
    picUrl: user.picUrl,
  });

  return (
    <div className="container mt-4">
      <h2>Thông tin cá nhân</h2>
      <button onClick={() => setShowPopup(true)}>Xem chi tiết</button>

      <UserProfile
        show={showPopup}
        onClose={() => setShowPopup(false)}
        user={toUserProfile(user)} // 👈 Chuyển đổi từ User sang UserProfileProps
      />
    </div>
  );
}

import { useUser } from "../context/UserContext";
import UserProfile from "../components/profile/UserProfile";
import { useState } from "react";


// dọn sau

export default function ProfilePage() {
  const { user } = useUser();
  const [showPopup, setShowPopup] = useState(true); 

  if (!user) return <p>Đang tải thông tin...</p>;

  return (
    <div className="container mt-4">
      <h2>Thông tin cá nhân</h2>
      <button onClick={() => setShowPopup(true)}>Xem chi tiết</button>

      <UserProfile
        show={showPopup}
        onClose={() => setShowPopup(false)}
        user={user}
      />
    </div>
  );
}

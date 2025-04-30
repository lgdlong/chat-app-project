import { useUser } from "../context/UserContext";
import UserProfile from "../components/profile/UserProfile";
export default function ProfilePage() {
  const { user } = useUser();
  if (!user) return <p>Đang tải thông tin...</p>;

  return <UserProfile user={user} />;
}

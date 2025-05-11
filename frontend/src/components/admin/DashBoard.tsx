import { useEffect, useState } from "react";
import { getAllUsers, getOnlineUserCount } from "../../api/apiUser";
import { UserFullProps } from "../../interfaces/UserFullProps";
import { Spinner } from "react-bootstrap";
import OnlineUserList from "./OnlineUserList";
import AccountStatsCards from "./AccountStatsCards";

export default function Dashboard() {
  const [users, setUsers] = useState<UserFullProps[]>([]);
  const [online, setOnline] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, onlineCount] = await Promise.all([
          getAllUsers(),
          getOnlineUserCount(),
        ]);
        setUsers(userRes);
        setOnline(onlineCount);
      } catch (error) {
        console.error("❌ Failed to load dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const total = users.length;
  const active = users.filter((u) => u.status === "ACTIVE").length;
  const banned = users.filter((u) => u.status === "BANNED").length;

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div>
      <h3 className="mb-4">Admin Dashboard</h3>
      <OnlineUserList />
      <AccountStatsCards
        total={total}
        active={active}
        banned={banned}
        online={online}
      />
    </div>
  );
}

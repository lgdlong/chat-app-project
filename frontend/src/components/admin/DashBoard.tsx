import { useEffect, useState } from "react";
import { getAllUsers, getOnlineUserCount } from "../../api/apiUser";
import { UserFullProps } from "../../interfaces/UserFullProps";
import { Spinner } from "react-bootstrap";
import OnlineUserList from "./OnlineUserList";
import AccountStatsCards from "./AccountStatsCards";

import { useEffect, useState } from "react";
import { getAllUsers, getOnlineUserCount } from "../../api/apiUser";
import { UserFullProps } from "../../interfaces/UserFullProps";
import { Alert, Button, Spinner } from "react-bootstrap";
import OnlineUserList from "./OnlineUserList";
import AccountStatsCards from "./AccountStatsCards";

export default function Dashboard() {
  const [users, setUsers] = useState<UserFullProps[]>([]);
  const [online, setOnline] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const [userRes, onlineCount] = await Promise.all([
        getAllUsers(),
        getOnlineUserCount(),
      ]);
      setUsers(userRes);
      setOnline(onlineCount);
      setError("");
    } catch (error) {
      console.error("❌ Failed to load dashboard data:", error);
      setError("Unable to load dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    // Set up polling for real-time updates
    const intervalId = setInterval(fetchData, 60000); // Refresh every minute

    // Clean up on unmount
    return () => clearInterval(intervalId);
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

  if (error) {
    return (
      <Alert variant="danger" className="mt-3">
        {error}
        <div className="mt-2">
          <Button variant="outline-danger" onClick={fetchData}>
            Try Again
          </Button>
        </div>
      </Alert>
    );
  }

  return (
    <div>
      <h3 className="mb-4">Admin Dashboard</h3>
      <Button
        variant="outline-primary"
        className="mb-3"
        onClick={fetchData}
        disabled={loading}
      >
        {loading ? "Refreshing..." : "Refresh Data"}
      </Button>
      <AccountStatsCards
        total={total}
        active={active}
        banned={banned}
        online={online}
      />
      <OnlineUserList />
    </div>
  );
}

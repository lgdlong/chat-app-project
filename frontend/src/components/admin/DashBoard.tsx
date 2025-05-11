import { useEffect, useState } from "react";
import { getAllUsers } from "../../api/apiUser";
import { UserFullProps } from "../../interfaces/UserFullProps";
import { Card, Spinner } from "react-bootstrap";

export default function DashBoard() {
  const [users, setUsers] = useState<UserFullProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAllUsers();
        setUsers(res);
      } catch (error) {
        console.error("❌ Failed to load users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const total = users.length;
  const active = users.filter((u) => u.status === "ACTIVE").length;
  const banned = users.filter((u) => u.status === "BANNED").length;

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div className="d-flex gap-4 flex-wrap">
      <Card bg="light" className="shadow-sm flex-fill text-center p-3">
        <h5>Total Users</h5>
        <h2>{total}</h2>
      </Card>

      <Card
        bg="success"
        text="white"
        className="shadow-sm flex-fill text-center p-3"
      >
        <h5>Active Users</h5>
        <h2>{active}</h2>
      </Card>

      <Card
        bg="danger"
        text="white"
        className="shadow-sm flex-fill text-center p-3"
      >
        <h5>Banned Users</h5>
        <h2>{banned}</h2>
      </Card>
    </div>
  );
}

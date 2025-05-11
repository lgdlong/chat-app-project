import { useEffect, useState } from "react";
import { Table, Spinner, Alert } from "react-bootstrap";
import api from "../../api/axiosConfig";

export default function OnlineUserList() {
  const [userMap, setUserMap] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOnlineMap = async () => {
      try {
        const res = await api.get("/api/online/map");
        setUserMap(res.data);
      } catch (err) {
        console.error("❌ Failed to load online user map:", err);
        setError("Unable to fetch online users.");
      } finally {
        setLoading(false);
      }
    };

    fetchOnlineMap();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-4">
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div className="mt-4">
      <h5>Online Users</h5>
      <Table striped bordered hover size="sm" responsive>
        <thead>
          <tr>
            <th>Username</th>
            <th>Connections</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(userMap).map(([username, count]) => (
            <tr key={username}>
              <td>{username}</td>
              <td>{count}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

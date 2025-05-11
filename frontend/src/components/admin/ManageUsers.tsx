import { useState, useEffect } from "react";
import UserTable from "./UserTable";
import { UserFullProps } from "../../interfaces/UserFullProps";
import { getAllUsers, updateUserByAdmin } from "../../api/apiUser";
import Loading from "../Loading";
import { Form } from "react-bootstrap";
import UserEditForm from "./UserEditForm";
import { AdminUserUpdate } from "../../interfaces/AdminUserUpdate";

export default function ManageUsers() {
  const [users, setUsers] = useState<UserFullProps[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserFullProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [showActive, setShowActive] = useState(true);
  const [showBanned, setShowBanned] = useState(true);

  const totalUsers = users.length;
  const totalActive = users.filter((u) => u.status === "ACTIVE").length;
  const totalBanned = users.filter((u) => u.status === "BANNED").length;

  const filteredUsers = users.filter((user) => {
    if (showActive && user.status === "ACTIVE") return true;
    if (showBanned && user.status === "BANNED") return true;
    return false;
  });

  const handleSave = async (updated: AdminUserUpdate) => {
    try {
      await updateUserByAdmin(selectedUser!.id, updated);
      const refreshed = await getAllUsers();
      setUsers(refreshed);
      setSelectedUser(null);
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAllUsers();
        setUsers(res);
      } catch (err) {
        console.error("❌ Lỗi tải users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <Loading />;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h2>User Table</h2>
        <div className="text-end small text-muted">
          <p>
            Total: {totalUsers} | Active: {totalActive} | Banned: {totalBanned}
          </p>
        </div>
      </div>

      <div className="mb-3 d-flex gap-3">
        <Form.Check
          type="checkbox"
          label="Active"
          checked={showActive}
          onChange={() => setShowActive(!showActive)}
          inline
        />
        <Form.Check
          type="checkbox"
          label="Banned"
          checked={showBanned}
          onChange={() => setShowBanned(!showBanned)}
          inline
        />
      </div>

      <UserTable users={filteredUsers} onRowDoubleClick={setSelectedUser} />

      {selectedUser && (
        <UserEditForm
          user={selectedUser}
          onCancel={() => setSelectedUser(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

import { Badge, Table } from "react-bootstrap";
import { UserFullProps } from "../../interfaces/UserFullProps";

interface UserTableProps {
  users: UserFullProps[];
  onRowDoubleClick: (user: UserFullProps) => void;
}

export default function UserTable({ users, onRowDoubleClick }: UserTableProps) {
  return (
export default function UserTable({ users, onRowDoubleClick }: UserTableProps) {
  if (users.length === 0) {
    return (
      <div className="text-center p-4">
        <p className="text-muted">No users found</p>
      </div>
    );
  }

  return (
    <Table
      striped
      bordered
      hover
      responsive="md"
      size="sm"
      className="table-sm"
    >
      <caption>User List</caption>
      <thead>
        <tr>
          <th>#</th>
          <th>Username</th>
          <th>Display Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Role</th>
          <th>Status</th>
          <th>Created At</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={user.id} onDoubleClick={() => onRowDoubleClick(user)}>
            <td>{index + 1}</td>
            <td>{user.username}</td>
            <td>{user.displayName}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>
              <Badge bg={user.role === "ADMIN" ? "warning" : "secondary"}>
                {user.role}
              </Badge>
            </td>
            <td>
              <Badge bg={user.status === "ACTIVE" ? "success" : "danger"}>
                {user.status}
              </Badge>
            </td>
            <td>{new Date(user.createdAt).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

import { useLocation, useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import "./AdminSideBar.css";

export default function AdminSideBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { label: "Dashboard", path: "/admin" },
    { label: "Manage Users", path: "/admin/users" },
  ];

  return (
    <div className="admin-sidebar">
      <div className="admin-sidebar-header">
        <h1 className="noselect">ADMIN PANEL</h1>
      </div>
      <Nav className="flex-column">
        {menuItems.map((item) => (
          <Nav.Link
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`admin-nav-item ${
              location.pathname === item.path ? "active" : ""
            }`}
          >
            {item.label}
          </Nav.Link>
        ))}
      </Nav>
    </div>
  );
}

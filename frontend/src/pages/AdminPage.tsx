import AdminSideBar from "../components/sidebar/AdminSideBar";
import { Outlet } from "react-router-dom";
import "./AdminPage.css";

export default function AdminPage() {
  return (
    <div className="admin-layout d-flex flex-row">
      <AdminSideBar />
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
}

import { Routes, Route, useLocation } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/HomePage";
import Loading from "../components/Loading";
import AdminPage from "../pages/AdminPage";
import ManageUsers from "../components/admin/ManageUsers";
import DashBoard from "../components/admin/DashBoard";

export default function AppRoutes() {
  const location = useLocation();

  return (
    <Routes>
      <Route path="/" element={<Loading />} />

      {/* Auth routes */}
      <Route path="/login" element={<LoginPage key={location.key} />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected routes */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />

      {/* ✅ Admin routes */}
      <Route path="/admin" element={<AdminPage />}>
        <Route index element={<DashBoard />} />{" "}
        {/* 👈 đây là route mặc định khi vào /admin */}
        <Route path="dashboard" element={<DashBoard />} />
        <Route path="users" element={<ManageUsers />} />
        {/* Route con khác ở đây */}
      </Route>
    </Routes>
  );
}

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

export default function AppRoutes() {
  return (
    <Routes>
      {/* <Navigate to="/login" replace />:
        - Chuyển hướng tự động sang /login
        - replace để không lưu / vào history (back sẽ không quay về /) */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

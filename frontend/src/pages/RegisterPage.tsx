import React from "react";
import "./AuthPage.css";
import RegisterHeader from "../components/RegisterHeader";
import RegisterForm from "../components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="auth-page">
      <RegisterHeader />
      <RegisterForm />
    </div>
  );
}

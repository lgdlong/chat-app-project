import React from "react";
import "./AuthPage.css";
import LoginHeader from "../components/LoginHeader";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <div className="auth-page">
      <LoginHeader />
      <LoginForm />
    </div>
  );
}

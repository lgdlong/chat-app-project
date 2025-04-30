import "./AuthPage.css";
import LoginHeader from "../components/auth/LoginHeader";
import LoginForm from "../components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="auth-page">
      <LoginHeader />
      <LoginForm />
    </div>
  );
}

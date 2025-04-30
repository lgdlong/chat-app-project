import "./AuthPage.css";
import RegisterHeader from "../components/auth/RegisterHeader";
import RegisterForm from "../components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="auth-page">
      <RegisterHeader />
      <RegisterForm />
    </div>
  );
}

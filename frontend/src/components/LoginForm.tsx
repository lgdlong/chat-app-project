import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../api/authApi"; // Import your API function
import "./AuthForm.css";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // hook chuyển trang

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await loginUser({ username, password });
      const { token } = response.data;
      localStorage.setItem("token", token);
      navigate("/home");
    } catch (err) {
      console.error(err);
      alert("Sai tài khoản hoặc mật khẩu!");
    }
  };

  return (
    <div className="container auth-form">
      <h2 className="form-heading text-center mb-3">Log In</h2>
      <p className="subheading text-center mb-5">
        Hey, Enter your details to get sign in to your account
      </p>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="usernameOrPhone">
          <Form.Control
            className="input"
            type="text"
            placeholder="Username / Phone"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            className="input"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button
          className="w-100 mt-4 mb-5 p-3 submit-btn"
          variant="primary"
          type="submit"
        >
          Log in
        </Button>

        <p className="subtext-other-signin text-center">─ Or Sign in with ─</p>

        <p className="text-center mb-5 color-dark">
          Don't have an account?{" "}
          <Link to="/register" className="text-decoration-none">
            <strong>Sign up</strong>
          </Link>
        </p>
      </Form>
    </div>
  );
}

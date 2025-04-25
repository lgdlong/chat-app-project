import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./AuthForm.css";

export default function LoginForm() {
  return (
    <div className="container auth-form">
      <h2 className="form-heading text-center mb-3">Log In</h2>
      <p className="subheading text-center mb-5">
        Hey, Enter your details to get sign in to your account
      </p>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            className="input"
            type="email"
            placeholder="Username / Phone"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            className="input"
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Button
          className="w-100 mt-4 mb-5 p-3 submit-btn"
          variant="primary"
          type="submit"
        >
          Sign in
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

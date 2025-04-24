import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./AuthForm.css";

export default function RegisterForm() {
  return (
    <div className="container auth-form">
      <h2 className="form-heading text-center mb-3">Sign Up</h2>
      <p className="subheading text-center mb-5">
        Create your account in just a few steps
      </p>

      <Form>
        {/* Username */}
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Control
            className="input"
            type="text"
            placeholder="Username"
            required
          />
        </Form.Group>

        {/* Email */}
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Control
            className="input"
            type="email"
            placeholder="Email"
            required
          />
        </Form.Group>

        {/* Phone */}
        <Form.Group className="mb-3" controlId="formPhone">
          <Form.Control
            className="input"
            type="tel"
            placeholder="Phone number"
            pattern="[0-9]{9,15}"
            maxLength={15}
            required
          />
        </Form.Group>

        {/* Password */}
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Control
            className="input"
            type="password"
            placeholder="Password"
            required
          />
        </Form.Group>

        {/* Confirm Password */}
        <Form.Group className="mb-4" controlId="formConfirmPassword">
          <Form.Control
            className="input"
            type="password"
            placeholder="Confirm Password"
            required
          />
        </Form.Group>

        {/* Submit */}
        <Button
          className="w-100 mt-4 mb-5 p-3 submit-btn"
          variant="primary"
          type="submit"
        >
          Create Account
        </Button>

        {/* Link to Login */}
        <p className="text-center color-dark">
          Already have an account?{" "}
          <Link to="/login" className="text-decoration-none">
            <strong>Login</strong>
          </Link>
        </p>
      </Form>
    </div>
  );
}

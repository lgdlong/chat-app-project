import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../../api/authApi"; // Hàm gọi API backend

export default function RegisterForm() {
  // State lưu dữ liệu nhập từ form
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // Thông báo trạng thái đăng ký
  const [message, setMessage] = useState("");

  // For navigation
  const navigate = useNavigate();

  // Cập nhật dữ liệu khi nhập input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Xử lý khi nhấn nút Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Kiểm tra mật khẩu trùng nhau không
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      // Gọi API gửi dữ liệu lên backend
      const { username, phone, email, password } = formData;
      const response = await registerUser({ username, phone, email, password });
      
      // Kiểm tra kết quả trả về từ backend
      if (response.status === 201) {
        // Redirect to the success page
        navigate("/home");      
        alert("Đăng ký thành công!"); // Thông báo thành công
      } else {
        setMessage(response.data); // Trả về kết quả từ backend
      }
    } catch (error: any) {
      if (error.response?.data) {
        setMessage(error.response.data);
      } else {
        setMessage("Something went wrong!");
      }
    }
  };

  return (
    <div className="container auth-form">
      <h2 className="form-heading text-center mb-3">Sign Up</h2>
      <p className="subheading text-center mb-5">
        Create your account in just a few steps
      </p>

      <Form onSubmit={handleSubmit}>
        {/* Username */}
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Control
            className="input"
            type="text"
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Email */}
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Control
            className="input"
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
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
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Password */}
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Control
            className="input"
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Confirm Password */}
        <Form.Group className="mb-4" controlId="formConfirmPassword">
          <Form.Control
            className="input"
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Submit */}
        <Button
          className="w-100 mt-4 mb-4 p-3 submit-btn"
          variant="primary"
          type="submit"
        >
          Create Account
        </Button>

        {/* Hiển thị thông báo kết quả */}
        {message && <p className="text-center mt-2">{message}</p>}

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

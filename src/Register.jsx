import React, { useState } from "react";
import "./Register.css";
import { useNavigate, Link } from "react-router-dom";
import { handleSuccess, handleError } from "./Util";
import Navbar from "./Navbar";

const Register = () => {
  const [signup, setSignup] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignup((prev) => ({ ...prev, [name]: value }));
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, phone } = signup;

    if (!username || !email || !password || !phone) {
      return handleError("All fields are required");
    }

    try {
      const url = "http://localhost:8081/api/register";
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signup),
      });

      const result = await response.json();

      if (result.success) {
        handleSuccess(result.message);
        setTimeout(() => navigate("/login"), 1000);
      } else {
        handleError(result.message);
      }
    } catch (error) {
      handleError(error.message || "Something went wrong");
    }
  };

  return (
    <>
      <Navbar />
      <div className="register-container">
        <div className="register-card">
          <h2>Create Your Account ✨</h2>
          <p className="subtitle">Join us and start your journey</p>

          <form onSubmit={handlesubmit}>
            <div className="input-group">
              <input
                type="text"
                placeholder="Username"
                name="username"
                required
                onChange={handleChange}
                value={signup.username}
              />
            </div>

            <div className="input-group">
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                required
                onChange={handleChange}
                value={signup.email}
              />
            </div>

            <div className="input-group">
              <input
                type="password"
                placeholder="Password"
                name="password"
                required
                onChange={handleChange}
                value={signup.password}
              />
            </div>

            <div className="input-group">
              <input
                type="tel"
                placeholder="Phone Number"
                name="phone"
                required
                onChange={handleChange}
                value={signup.phone}
              />
            </div>

            <div className="agreement">
              <label>
                <input type="checkbox" required /> I agree to the{" "}
                <span className="link-text">Terms</span> and{" "}
                <span className="link-text">Privacy Policy</span>
              </label>
            </div>

            <button type="submit" className="btn-primary">
              Create Account
            </button>

            <p className="login-text">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;

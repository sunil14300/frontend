import React, { useState } from "react";
import "./Login.css";
import { handleSuccess, handleError } from "./Util"; // ✅ Update path
import { useNavigate, Link } from "react-router-dom";
import Navbar from "./Navbar"; // ✅ Correct path

const Login = () => {
  const [logininfo, setLogininfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogininfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = logininfo;

    if (!email || !password) {
      return alert("Email and password are required");
    }

    try {
      const url = "https://backend-3-5sxs.onrender.com/api/login";
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(logininfo),
      });

      const result = await response.json();

      if (result.message === "Login successful") {
        alert(result.message);
        localStorage.setItem("username", result.username); // optional
        navigate("/"); // redirect after login
      } else {
        alert(result.message); // show error message
      }
    } catch (error) {
      alert("Something went wrong: " + error.message);
    }
};


  return (
    <>
      <Navbar />
      <div className="login-container">
        <div className="login-card">
          <h2>Welcome Back 👋</h2>
          <p className="subtitle">Please login to your account</p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={logininfo.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={logininfo.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="remember-forgot">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <Link to="/forgot-password">Forgot password?</Link>
            </div>

            <button type="submit" className="btn-primary">
              Login
            </button>

            <p className="register-text">
              Don’t have an account? <Link to="/register">Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;



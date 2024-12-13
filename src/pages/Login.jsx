import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const emailToUsername = {
    "john@gmail.com": "johnd",
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const username = emailToUsername[email];
    if (!username) {
      setError("Email not found. Use valid Email.");
      return;
    }

    const loginData = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        alert("Login success!");
        navigate("/");
      } else {
        setError("Login failed. Please check your email and password.");
      }
    } catch (err) {
      setError("Something wrong. Please try again later.");
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleLogin}>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Input email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Input password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-dark w-100">
              Login
            </button>
          </form>
          <p className="text-center mt-3">
            Gunakan Email: <strong>john@gmail.com</strong> <br />
            Password: <strong>m38rmF$</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

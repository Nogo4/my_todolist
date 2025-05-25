import React, { useState } from "react";
import "./css/login.css";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Erreur login");
      }

      localStorage.setItem("token", data.token);
      navigate("/private/todolist");
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("An unknown error occurred.");
      }
    }
  };

  return (
    <div className="dark-container">
      <div className="rounded-box">
        <h1 className="login_title">Login</h1>
        <form onSubmit={handleSubmit} autoComplete="on">
          <div className="input-wrapper">
            <label htmlFor="email" className="visually-hidden">
              Email
            </label>
            <span className="email-icon">
              <i className="fas fa-envelope"></i>
            </span>
            <input
              id="email"
              className="email-input"
              type="email"
              value={email}
              placeholder="email : example@xyz.com"
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="password" className="visually-hidden">
              Password
            </label>
            <span className="password-icon">
              <i className="fas fa-lock"></i>
            </span>
            <input
              id="password"
              className="password-input"
              type={isPasswordVisible ? "text" : "password"}
              value={password}
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
            <span
              className="toggle-password"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              tabIndex={0}
              role="button"
              aria-label={
                isPasswordVisible
                  ? "Masquer le mot de passe"
                  : "Afficher le mot de passe"
              }
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ")
                  setIsPasswordVisible(!isPasswordVisible);
              }}
            >
              <i
                className={`fas ${
                  isPasswordVisible ? "fa-eye" : "fa-eye-slash"
                }`}
              ></i>
            </span>
          </div>

          <div className="login-button-wrapper">
            <button type="submit" className="login-button">
              Login
            </button>
          </div>
        </form>

        <div className="register-link">
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="login-link-text">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

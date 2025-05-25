import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/register.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Register_page() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          firstname: firstName,
          name: lastName,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Erreur inscription");
      }

      localStorage.setItem("token", data.token);
      navigate("/private/todolist");
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("An unknown error occurred");
      }
    }
  };

  return (
    <div className="dark-container">
      <div className="rounded-box">
        <h1 className="register_title">Register</h1>
        <form onSubmit={handleSubmit} autoComplete="on">
          <div className="input-wrapper">
            <label htmlFor="firstName" className="visually-hidden">
              First name
            </label>
            <span className="name-icon">
              <i className="fas fa-user"></i>
            </span>
            <input
              id="firstName"
              className="name-input"
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              autoComplete="given-name"
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="lastName" className="visually-hidden">
              Last name
            </label>
            <span className="name-icon">
              <i className="fas fa-user"></i>
            </span>
            <input
              id="lastName"
              className="name-input"
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              autoComplete="family-name"
            />
          </div>
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
              autoComplete="new-password"
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
          <div className="input-wrapper">
            <label htmlFor="confirmPassword" className="visually-hidden">
              Confirm password
            </label>
            <span className="password-icon">
              <i className="fas fa-lock"></i>
            </span>
            <input
              id="confirmPassword"
              className="password-input"
              type={isPasswordVisible ? "text" : "password"}
              value={confirmPassword}
              placeholder="confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>

          <div className="register-button-wrapper">
            <button type="submit" className="register-button">
              Register
            </button>
          </div>
        </form>
        <div className="login-link">
          <p>
            Already have an account?{" "}
            <Link to="/" className="login-link-text">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

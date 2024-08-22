import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fakeBackend } from "../../../fake-backend"; // Импортируем fake backend
import "./index.css";
import arrow from "../../../assets/loginPage/ArrowUUpLeft.svg";

const AuthForm = ({ isSignUp, onSubmit }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBackClick = () => {
    navigate("/"); // Навигация назад
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit({ email, password, confirmPassword });
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <p className="form-subtitle">
        Sign in or register for an account to access all features
      </p>
      <div className="input-box">
        <input
          type="text"
          placeholder="Enter your e-mail"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isSignUp && (
          <input
            type="password"
            placeholder="Repeat your password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}
      </div>

      <div className="buttons-box">
        <button type="button" className="button-back" onClick={handleBackClick}>
          <img src={arrow} />
          Back
        </button>
        <button type="submit" className="button-login" disabled={loading}>
          {loading ? "Loading..." : isSignUp ? "Sign up" : "Login"}
        </button>
      </div>
      <p className="forgot-link">Forgot password?</p>
    </form>
  );
};

export default AuthForm;

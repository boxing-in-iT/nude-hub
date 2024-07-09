import React from "react";
import { useNavigate } from "react-router-dom"; // Импортируйте useNavigate
import "./index.css";
import logo from "../../../assets/loginPage/logo.svg";
import Switcher from "./Switcher";

const LoginForm = () => {
  const navigate = useNavigate(); // Создайте navigate

  const handleBackClick = () => {
    navigate("/"); // Навигация назад
  };

  return (
    <form>
      <p className="form-subtitle">
        Sign in or register for an account to access all features
      </p>
      <div className="input-box">
        <input type="text" placeholder="Enter your e-mail" />
        <input type="text" placeholder="Enter your password" />
      </div>

      <div className="buttons-box">
        <button type="button" className="button-back" onClick={handleBackClick}>
          Back
        </button>
        <button type="submit" className="button-login">
          Login
        </button>
      </div>
      <p className="forgot-link">Forgot password?</p>
    </form>
  );
};

export default LoginForm;

import React from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
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
        <input type="text" placeholder="Repeat your password" />
      </div>

      <div className="buttons-box">
        <button className="button-back" onClick={handleBackClick}>
          Back
        </button>
        <button className="button-login">Sign up</button>
      </div>
      <p className="forgot-link">Forgot password?</p>
    </form>
  );
};

export default SignUp;

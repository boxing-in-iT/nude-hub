import React from "react";
import "./index.css";
import logo from "../../../assets/loginPage/logo.svg";
import Switcher from "./Switcher";

const LoginForm = () => {
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
        <button className="button-back">Back</button>
        <button className="button-login">Login</button>
      </div>
      <p className="forgot-link">Forgot password?</p>
    </form>
  );
};

export default LoginForm;

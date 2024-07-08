import React from "react";
import "./index.css";
import logo from "../../../assets/loginPage/logo.svg";

const LoginForm = () => {
  return (
    <section>
      <div>
        <form>
          <img className="form-logo" src={logo} />
          <div className="form-switcher">
            <div className="active">Log in</div>
            <div>Sign up</div>
          </div>
          <p>Sign in or register for an account to access all features</p>
          <input type="text" placeholder="Enter your e-mail" />
          <input type="text" placeholder="Enter your password" />
          <div className="buttons-box">
            <button className="button-back">Back</button>
            <button className="button-login">Login</button>
          </div>
          <p className="forgot-link">Forgot password?</p>
        </form>
      </div>
    </section>
  );
};

export default LoginForm;

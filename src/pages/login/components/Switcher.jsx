import React from "react";
import logo from "../../../assets/loginPage/logo.svg";

const Switcher = ({ activeForm, setActiveForm }) => {
  return (
    <>
      <img className="form-logo" src={logo} />
      <div className="form-switcher">
        <div
          className={activeForm === "login" ? "active" : ""}
          onClick={() => setActiveForm("login")}
        >
          Log in
        </div>
        <div
          className={activeForm === "signup" ? "active" : ""}
          onClick={() => setActiveForm("signup")}
        >
          Sign up
        </div>
      </div>
    </>
  );
};

export default Switcher;

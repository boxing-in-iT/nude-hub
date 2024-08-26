import React, { useState } from "react";
import Switcher from "./components/Switcher";
import LoginForm from "./components/LoginForm";
import SignUp from "./components/SignUp";
import ForgotPasswordForm from "./components/ForgotPasswordForm"; // Новая форма

const Login = () => {
  const [activeForm, setActiveForm] = useState("login");

  return (
    <section>
      <Switcher activeForm={activeForm} setActiveForm={setActiveForm} />
      {activeForm === "login" && <LoginForm setActiveForm={setActiveForm} />}
      {activeForm === "signup" && <SignUp />}
      {activeForm === "forgotPassword" && <ForgotPasswordForm />}{" "}
      {/* Новая форма */}
    </section>
  );
};

export default Login;

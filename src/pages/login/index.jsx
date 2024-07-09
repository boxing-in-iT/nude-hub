import React, { useState } from "react";
import LoginForm from "./components/LoginForm";
import Switcher from "./components/Switcher";
import SignUp from "./components/SignUp";

const Login = () => {
  const [activeForm, setActiveForm] = useState("login");

  return (
    <section>
      <Switcher activeForm={activeForm} setActiveForm={setActiveForm} />
      {activeForm === "login" ? <LoginForm /> : <SignUp />}
    </section>
  );
};

export default Login;

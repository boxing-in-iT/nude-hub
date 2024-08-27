import React from "react";
import logo from "../../../assets/loginPage/logo.svg";
import { useTranslation } from "react-i18next";

const Switcher = ({ activeForm, setActiveForm }) => {
  const { t } = useTranslation();

  return (
    <>
      <img className="form-logo" alt={t("logo_alt")} src={logo} />
      <div className="form-switcher">
        <div
          className={activeForm === "login" ? "active" : ""}
          onClick={() => setActiveForm("login")}
        >
          {t("switcher_login")}
        </div>
        <div
          className={activeForm === "signup" ? "active" : ""}
          onClick={() => setActiveForm("signup")}
        >
          {t("switcher_signup")}
        </div>
      </div>
    </>
  );
};

export default Switcher;

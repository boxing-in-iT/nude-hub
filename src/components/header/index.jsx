import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../../assets/header/logo.svg";
import boy from "../../assets/header/GenderMale.svg";
import girl from "../../assets/header/GenderFemale.svg";
import "./index.css";

const Header = () => {
  const { t } = useTranslation();
  const [activeGender, setActiveGender] = useState("girl");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const auth = useSelector((state) => state.auth.value);
  const navigate = useNavigate();

  const scrollTo = (id) => {
    let element = document.getElementById(id);
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  const handleLinkClick = (sectionId) => {
    if (window.location.pathname !== "/") {
      navigate("/", { replace: true }); // Перенаправляем на главную страницу
      setTimeout(() => {
        scrollTo(sectionId); // Прокручиваем к нужной секции после перехода
      }, 100); // Задержка для того, чтобы страница успела загрузиться
    } else {
      scrollTo(sectionId); // Прокручиваем к нужной секции, если уже на главной
    }
  };

  return (
    <header>
      <div className="header-content">
        <div
          className="header-hamburger-menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="header-box">
          <Link to={"/"}>
            <img className="header-logo" src={logo} alt="logo" />
          </Link>
          <div className="header-box-genders">
            <div
              className={`header-box-gender ${
                activeGender === "boy" ? "active-boy" : ""
              }`}
              onClick={() => setActiveGender("boy")}
            >
              <img src={boy} alt="boys" />
              <p>{t("boys")}</p>
            </div>
            <div
              className={`header-box-gender ${
                activeGender === "girl" ? "active-girl" : ""
              }`}
              onClick={() => setActiveGender("girl")}
            >
              <img src={girl} alt="girls" />
              <p>{t("girls")}</p>
            </div>
          </div>
        </div>
        <div className={`header-box ${isMenuOpen ? "menu-open" : ""}`}>
          <nav>
            {isMenuOpen && (
              <button
                className="header-close-button"
                onClick={() => setIsMenuOpen(false)}
              >
                &times;
              </button>
            )}
            <ul className="header-box-menu">
              <li
                onClick={() => handleLinkClick("welcome")}
                className="header-box-menu-item"
              >
                {t("home")}
              </li>
              <li
                onClick={() => handleLinkClick("pricing")}
                className="header-box-menu-item"
              >
                {t("pricing")}
              </li>
              <li
                onClick={() => handleLinkClick("faq")}
                className="header-box-menu-item"
              >
                {t("how_to")}
              </li>
            </ul>
            {auth ? (
              <Link to="/account">
                <button className="header-login-button">{auth.email}</button>
              </Link>
            ) : (
              <Link to="/login">
                <button className="header-login-button">{t("login")}</button>
              </Link>
            )}
          </nav>
          <Link to="/account">
            <button className="header-login-button-mobile">
              {auth ? auth.email : t("login")}
            </button>
          </Link>
        </div>
      </div>
      {isMenuOpen && (
        <div
          className="menu-backdrop"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </header>
  );
};

export default Header;

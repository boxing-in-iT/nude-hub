import React, { useState } from "react";
import { useSelector } from "react-redux"; // Импортировать useSelector
import { Link } from "react-router-dom";
import logo from "../../assets/header/logo.svg";
import boy from "../../assets/header/GenderMale.svg";
import girl from "../../assets/header/GenderFemale.svg";
import "./index.css";

const Header = () => {
  const [activeGender, setActiveGender] = useState("girl");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const auth = useSelector((state) => state.auth.value);

  const scrollTo = (id) => {
    let element = document.getElementById(id);
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
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
              <p>boys</p>
            </div>
            <div
              className={`header-box-gender ${
                activeGender === "girl" ? "active-girl" : ""
              }`}
              onClick={() => setActiveGender("girl")}
            >
              <img src={girl} alt="girls" />
              <p>girls</p>
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
                onClick={() => scrollTo("welcome")}
                className="header-box-menu-item"
              >
                Home
              </li>
              <li
                onClick={() => scrollTo("examples-section")}
                className="header-box-menu-item"
              >
                Examples
              </li>
              <li
                onClick={() => scrollTo("pricing")}
                className="header-box-menu-item"
              >
                Pricing
              </li>
              <li
                onClick={() => scrollTo("faq")}
                className="header-box-menu-item"
              >
                How to
              </li>
            </ul>
            {auth ? (
              <Link to="/account">
                <button className="header-login-button">{auth.email}</button>
              </Link>
            ) : (
              <Link to="/login">
                <button className="header-login-button">Login</button>
              </Link>
            )}
          </nav>
          <button className="header-login-button-mobile">
            {auth ? auth.email : "Login"}
          </button>
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

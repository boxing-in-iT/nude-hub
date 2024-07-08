import React, { useState } from "react";
import logo from "../../assets/header/logo.svg";
import boy from "../../assets/header/GenderMale.svg";
import girl from "../../assets/header/GenderFemale.svg";

import "./index.css";

const Header = () => {
  const [activeGender, setActiveGender] = useState("girl");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          <img className="header-logo" src={logo} alt="logo" />
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
            <ul className="header-box-menu">
              <li className="header-box-menu-item">Home</li>
              <li className="header-box-menu-item">Examples</li>
              <li className="header-box-menu-item">Pricing</li>
              <li className="header-box-menu-item">How to</li>
            </ul>
            <button className="header-login-button">Login</button>
          </nav>
          <button className="header-login-button-mobile">Login</button>
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

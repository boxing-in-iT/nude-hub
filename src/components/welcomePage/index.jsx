import React from "react";
import "./index.css";
import logo from "../../assets/main/logo.png";
import star from "../../assets/main/star.svg";
import blueStar from "../../assets/main/blueStar.svg";
import DatingApps from "../dating-apps";
import WelcomeExamples from "./components/welcome-examples";
import rabbitHole from "../../assets/welcome/Vector.svg";

const WelcomePage = () => {
  return (
    <section id="welcome">
      <div className="welcome elipse-bg">
        <div className="logo-box mobile">
          <img className="logo-img" src={logo} alt="logo" />
          <div className="logo">
            <span className="nude">NUDE</span>
            <span className="hub">HUB</span>
            <span className="ai">
              <span className="a">A</span>
              <span className="i">I</span>
            </span>
          </div>
        </div>
        <div className="welcome-box exmpl">
          <WelcomeExamples />
        </div>
        <div className="welcome-box">
          <div className="logo-box desktop">
            <img className="logo-img" src={logo} alt="logo" />
            <div className="logo">
              <span className="nude">NUDE</span>
              <span className="hub">HUB</span>
              <span className="ai">
                <span className="a">A</span>
                <span className="i">I</span>
              </span>
            </div>
          </div>

          <DatingApps />
        </div>
      </div>
      <img src={star} alt="star" className="star-1" />
      <img src={star} alt="star" className="star-2" />
      <img src={star} alt="star" className="star-3" />
      <img src={star} alt="star" className="star-4" />
      <img src={star} alt="star" className="star-8" />
      <img src={blueStar} alt="star" className="star-5" />
      <img src={blueStar} alt="star" className="star-6" />
      <img src={blueStar} alt="star" className="star-7" />
      <img src={blueStar} alt="star" className="star-9" />
      <img src={blueStar} alt="star" className="star-10" />
      <img src={rabbitHole} alt="star" className="rabbit-hole" />
    </section>
  );
};

export default WelcomePage;

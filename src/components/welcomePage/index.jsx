import React from "react";
import mainPhoto from "../../assets/main/image 370.png";
import logo from "../../assets/main/logo.png";

import girl from "../../assets/main/girl.png";
import nudeGirl from "../../assets/main/nudeGirl.png";
import star from "../../assets/main/star.svg";
import blueStar from "../../assets/main/blueStar.svg";

const WelcomePage = () => {
  return (
    <section id="welcome">
      <div className="welcome-column">
        <div className="welcome-container elipse-bg stars">
          <div className="welcome-container-box">
            <img
              className="main-photo"
              src={mainPhoto}
              alt="main photo of girl"
            />
          </div>
          <div className="welcome-container-box">
            <img className="logo-img" src={logo} alt="logo" />
            <div class="logo">
              <span class="nude">NUDE</span>
              <span class="hub">HUB</span>
              <span class="ai">
                <span class="a">A</span>
                <span class="i">I</span>
              </span>
            </div>
          </div>
        </div>
        <div className="welcome-container">
          <div className="welcome-container-plashka">
            <div className="welcome-container-plashka-left-box">
              <h3 className="welcome-container-plashka-box-title">
                Get undressed your own AI Girlfriend
              </h3>
              <div style={{ width: "80%" }}>
                <p className="welcome-container-plashka-box-p">
                  Your dream companion awaits! Create your AI Girlfriend, shape
                  her look, personality, and bring her to life in one click.
                  100% powered by Artificial Intelligence.
                </p>
              </div>

              <button className="welcome-container-plashka-button">
                Create your AI
              </button>
            </div>
            <div className="welcome-container-plashka-right-box">
              <img src={girl} />
              <img src={nudeGirl} />
            </div>
          </div>
        </div>
      </div>
      <img src={star} alt="star" className="star-1" />
      <img src={star} alt="star" className="star-2" />
      <img src={star} alt="star" className="star-3" />
      <img src={star} alt="star" className="star-4" />
      <img src={blueStar} alt="star" className="star-5" />
      <img src={blueStar} alt="star" className="star-6" />
      <img src={blueStar} alt="star" className="star-7" />
    </section>
  );
};

export default WelcomePage;

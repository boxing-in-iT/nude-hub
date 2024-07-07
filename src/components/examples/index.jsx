import React from "react";
import PhotoSlider from "./components/PhotoSlider";

import img1 from "../../assets/examples/img1.png";
import img2 from "../../assets/examples/img2.png";

import blueLogo from "../../assets/examples/blueLogo.svg";
import pinkLogo from "../../assets/examples/pinkLogo.svg";
import blueStar from "../../assets/main/blueStar.svg";
import pinkStar from "../../assets/main/star.svg";

import "./index.css";

const Examples = () => {
  return (
    <section id="examples-section">
      <div className="example-title-box">
        <h1 className="example-title">
          Beautiful <span style={{ color: "#DE7084" }}>girls</span> will become
          even more beautiful right now
        </h1>
      </div>

      <div className="example-container">
        <div className="example-cards-container">
          <PhotoSlider image1={img1} image2={img2} />
          <PhotoSlider image1={img1} image2={img2} />
          <PhotoSlider image1={img1} image2={img2} />
          <PhotoSlider image1={img1} image2={img2} />
          <PhotoSlider image1={img1} image2={img2} />
          <PhotoSlider image1={img1} image2={img2} />
          <PhotoSlider image1={img1} image2={img2} />
          <PhotoSlider image1={img1} image2={img2} />
        </div>
      </div>

      <img src={blueLogo} alt="logo" className="example-blue-logo" />
      <img src={blueLogo} alt="logo" className="example-blue-logo-2" />
      <img src={blueLogo} alt="logo" className="example-blue-logo-3" />
      <img src={pinkLogo} alt="logo" className="example-pink-logo" />
      <img src={pinkLogo} alt="logo" className="example-pink-logo-2" />
      <img src={pinkLogo} alt="logo" className="example-pink-logo-3" />
      <img src={pinkStar} alt="logo" className="example-pink-star" />
      <img src={pinkStar} alt="logo" className="example-pink-star-2" />
      <img src={blueStar} alt="logo" className="example-blue-star" />
      <img src={blueStar} alt="logo" className="example-blue-star-2" />
    </section>
  );
};

export default Examples;

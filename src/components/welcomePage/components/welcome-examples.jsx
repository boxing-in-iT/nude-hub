import React, { useState } from "react";
import "./index.css";
import girl1 from "../../../assets/welcome/girl1.png";
import girl2 from "../../../assets/welcome/girl2.png";
import girl3 from "../../../assets/welcome/girl3.png";
import PhotoSlider from "../../examples/components/PhotoSlider";

const WelcomeExamples = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(girl1);

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
  };

  return (
    <div className="welcome-examples">
      <div className="welcome-example-main-photo">
        <PhotoSlider image1={selectedPhoto} image2={selectedPhoto} />
      </div>
      <div className="welcome-example-photos">
        <div
          className={`wrapper ${selectedPhoto === girl1 ? "selected" : ""}`}
          onClick={() => handlePhotoClick(girl1)}
        >
          <img
            className="welcome-example-photos-photo"
            src={girl1}
            alt="girl"
          />
        </div>
        <div
          className={`wrapper ${selectedPhoto === girl2 ? "selected" : ""}`}
          onClick={() => handlePhotoClick(girl2)}
        >
          <img
            className="welcome-example-photos-photo"
            src={girl2}
            alt="girl"
          />
        </div>
        <div
          className={`wrapper ${selectedPhoto === girl3 ? "selected" : ""}`}
          onClick={() => handlePhotoClick(girl3)}
        >
          <img
            className="welcome-example-photos-photo"
            src={girl3}
            alt="girl"
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomeExamples;

import React, { useRef, useState } from "react";
import wand from "../../../assets/welcome/MagicWand.svg";
import { useTranslation } from "react-i18next";

const PhotoSlider = ({ image1, image2 }) => {
  const [value, setValue] = useState(50);
  const cardRef = useRef(null);
  const { t } = useTranslation();

  const handleMouseMove = (e) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const offsetY = e.clientY - rect.top;
      const newValue = (offsetY / rect.height) * 100;
      setValue(Math.max(0, Math.min(100, newValue)));
    }
  };

  const handleTouchMove = (e) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const touch = e.touches[0];
      const offsetY = touch.clientY - rect.top;
      const newValue = (offsetY / rect.height) * 100;
      setValue(Math.max(0, Math.min(100, newValue)));
    }
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleTouchEnd = () => {
    document.removeEventListener("touchmove", handleTouchMove);
    document.removeEventListener("touchend", handleTouchEnd);
  };

  const handleMouseDown = () => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleTouchStart = () => {
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);
  };

  return (
    <div className="example-card" ref={cardRef}>
      <img
        className="example-card-img"
        src={image1}
        alt="card 1"
        style={{ clipPath: `inset(0 0 ${100 - value}% 0)` }}
      />
      <img
        className="example-card-img"
        src={image2}
        alt="card 2"
        style={{ clipPath: `inset(${value}% 0 0 0)` }}
      />
      <div
        className="example-card-divider"
        style={{ top: `${value}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      />
      <button className="create-ai-button">
        <img src={wand} alt="wand" />
        {/* Create your AI */}
        {t("create_ai_button")}
      </button>
    </div>
  );
};

export default PhotoSlider;

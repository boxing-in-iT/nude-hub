import React, { useRef, useState } from "react";

const PhotoSlider = ({ image1, image2 }) => {
  const [value, setValue] = useState(50);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const offsetY = e.clientY - rect.top;
      const newValue = (offsetY / rect.height) * 100;
      setValue(Math.max(0, Math.min(100, newValue)));
    }
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleMouseDown = () => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="example-card" ref={cardRef}>
      <img
        className="example-card-img"
        src={image1}
        alt="Image 1"
        style={{ clipPath: `inset(0 0 ${100 - value}% 0)` }}
      />
      <img
        className="example-card-img"
        src={image2}
        alt="Image 2"
        style={{ clipPath: `inset(${value}% 0 0 0)` }}
      />
      <div
        className="example-card-divider"
        style={{ top: `${value}%` }}
        onMouseDown={handleMouseDown}
      />
    </div>
  );
};

export default PhotoSlider;

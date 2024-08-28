import React, { useRef, useState } from "react";
import wand from "../../../assets/welcome/MagicWand.svg";
import { useTranslation } from "react-i18next";
import arrows from "../../../assets/examples/ArrowsVertical.svg";

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
      >
        <div className="divider-icon">
          {/* <img src={arrows} alt="arrows" /> */}
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_545_15539)">
              <path
                d="M21.1242 24.0748C21.1982 24.2531 21.2176 24.4494 21.18 24.6389C21.1425 24.8283 21.0495 25.0023 20.9131 25.1389L17.0081 29.0438C16.9175 29.1346 16.8098 29.2066 16.6913 29.2557C16.5728 29.3048 16.4458 29.3301 16.3175 29.3301C16.1892 29.3301 16.0621 29.3048 15.9436 29.2557C15.8251 29.2066 15.7174 29.1346 15.6268 29.0438L11.7219 25.1389C11.5852 25.0023 11.4921 24.8283 11.4543 24.6389C11.4166 24.4494 11.4359 24.253 11.5099 24.0745C11.5839 23.896 11.7091 23.7435 11.8698 23.6362C12.0305 23.529 12.2194 23.4718 12.4125 23.472H15.3412V7.85229H12.4125C12.2194 7.85244 12.0305 7.79527 11.8698 7.68801C11.7091 7.58075 11.5839 7.42823 11.5099 7.24975C11.4359 7.07127 11.4166 6.87486 11.4543 6.68539C11.4921 6.49592 11.5852 6.32191 11.7219 6.18537L15.6268 2.28046C15.7174 2.18969 15.8251 2.11768 15.9436 2.06856C16.0621 2.01943 16.1892 1.99414 16.3175 1.99414C16.4458 1.99414 16.5728 2.01943 16.6913 2.06856C16.8098 2.11768 16.9175 2.18969 17.0081 2.28046L20.9131 6.18537C21.0497 6.32191 21.1428 6.49592 21.1806 6.68539C21.2183 6.87486 21.199 7.07127 21.125 7.24975C21.0511 7.42823 20.9258 7.58075 20.7651 7.68801C20.6045 7.79527 20.4156 7.85244 20.2224 7.85229H17.2937V23.472H20.2224C20.4155 23.472 20.6042 23.5293 20.7647 23.6366C20.9252 23.7439 21.0503 23.8964 21.1242 24.0748Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_545_15539">
                <rect
                  width="31.2393"
                  height="31.2393"
                  fill="white"
                  transform="translate(31.9434 0.0390625) rotate(90)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>

      <button className="create-ai-button">
        <img src={wand} alt="wand" />
        {/* Create your AI */}
        {t("create_ai_button")}
      </button>
    </div>
  );
};

export default PhotoSlider;

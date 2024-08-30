import React, { useState } from "react";
import ImageAnnotator from "../../components/ImageAnnotator";
import girl from "../../assets/welcome/girl1.png";
import rabbit from "../../assets/account/rabbit.png";
import plus from "../../assets/image/Plus.svg";

import "./index.css";
import CustomKonvaImage from "../../components/custom-image-konva";
import ImageCropper from "../../components/custom-image-konva";
import ImageCropDemo from "../../components/custom-image-konva";
import DrawingApp from "../../components/test-brush";

const ImageDownloader = () => {
  const [imageUrl, setImageUrl] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <section className="image-downloader-section">
      <div className="image-downloader-container">
        <div className="image-sidebar">
          <div className="sidebar-account-info desktop">
            <img src={rabbit} alt="Account " className="sidebar-account-icon" />
            <p className="sidebar-account-balance">245</p>
          </div>
          <div className="sidebar-images">
            <div className="sidebar-images-add-button">
              <img src={plus} className="plus-button" alt="Plus" />
            </div>
            <img src={girl} alt="card 1" className="sidebar-images-photo" />
            <img src={girl} alt="card 2" className="sidebar-images-photo" />
            <img src={girl} alt="card 3" className="sidebar-images-photo" />
            <img src={girl} alt="card 3" className="sidebar-images-photo" />
            <img src={girl} alt="card 3" className="sidebar-images-photo" />
          </div>
        </div>

        <div className="image-content">
          <ImageAnnotator />
        </div>
      </div>
      {/* <ImageCropDemo /> */}
      {/* <DrawingApp /> */}
      {/* <ImageCropDemo /> */}
    </section>
  );
};

export default ImageDownloader;

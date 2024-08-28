import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Image, Line } from "react-konva";
import { useDropzone } from "react-dropzone";
import pen from "../assets/image/pen.svg";
import erazer from "../assets/image/erazer.svg";
import undo from "../assets/image/undo.svg";
import tits from "../assets/image/tits.svg";
import downloadIco from "../assets/image/downloadIco.svg";
import width from "../assets/image/width.svg";

const ImageAnnotator = () => {
  const [image, setImage] = useState(null);
  const [lines, setLines] = useState([]);
  const isDrawing = useRef(false);
  const [strokeWidth, setStrokeWidth] = useState(10);
  const [tool, setTool] = useState("pen");

  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  console.log(size);

  const [imageWidth, setImageWidth] = useState(null);
  const [imageHeight, setImageHeight] = useState(null);

  const imageRef = useRef();
  const stageRef = useRef(); // Reference for the Stage component

  const [isPenSliderShow, setIsPenSliderShow] = useState(false);
  const [isEraserSliderShow, setIsEraserSliderShow] = useState(false);

  const penButtonRef = useRef();
  const eraserButtonRef = useRef();

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];

    if (file.size > MAX_FILE_SIZE) {
      alert("The file is too large. Please upload an image smaller than 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const img = new window.Image();
      img.src = reader.result;
      img.onload = () => {
        setImage(img);
        setImageWidth(img.width);
        setImageHeight(img.height);
      };
    };
    reader.readAsDataURL(file);
  };

  const undoLastLine = () => {
    setLines(lines.slice(0, -1));
  };

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y], strokeWidth }]);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([point.x, point.y]);
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handlePenClick = () => {
    setIsPenSliderShow(!isPenSliderShow);
    setTool("pen");
    setIsEraserSliderShow(false);
  };

  const handleEraserClick = () => {
    setIsEraserSliderShow(!isEraserSliderShow);
    setTool("eraser");
    setIsPenSliderShow(false);
  };

  const handlePenSliderChange = (value) => {
    setStrokeWidth(value);
  };

  useEffect(() => {
    const checkSize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      window.addEventListener("resize", checkSize);
      return () => {
        window.removeEventListener("resize", checkSize);
      };
    };
    checkSize();
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        penButtonRef.current &&
        !penButtonRef.current.contains(event.target)
      ) {
        setIsPenSliderShow(false);
      }
      if (
        eraserButtonRef.current &&
        !eraserButtonRef.current.contains(event.target)
      ) {
        setIsEraserSliderShow(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [penButtonRef, eraserButtonRef]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const downloadImage = () => {
    const uri = stageRef.current.toDataURL();
    const link = document.createElement("a");
    link.download = "annotated-image.png";
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="image-annotator-container">
      {imageWidth && imageHeight && (
        <div className="screen-resolution">
          <img src={width} alt="Resolution" />
          <p className="screen-resolution-text">
            {imageWidth}x{imageHeight}
          </p>
        </div>
      )}

      {!image && (
        <div {...getRootProps()} className="drag-drop-container">
          <input {...getInputProps()} />
          <img src={tits} alt="Drop Here" className="drag-drop-tits" />
          DROP HERE
          <img src={downloadIco} alt="Download Icon" className="download-ico" />
        </div>
      )}

      {image && (
        <div className="image-container">
          <Stage
            width={imageWidth}
            height={imageHeight}
            // width={
            //   imageWidth ? Math.min(imageWidth, window.innerWidth * 0.9) : 500
            // }
            // height={
            //   imageHeight
            //     ? Math.min(imageHeight, window.innerHeight * 0.9)
            //     : 500
            // }
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            ref={stageRef}
          >
            <Layer>
              <Image image={image} ref={imageRef} />
            </Layer>
            <Layer>
              {lines.map((line, i) => (
                <Line
                  key={i}
                  points={line.points}
                  stroke={`rgba(255, 105, 180, ${
                    line.tool === "eraser" ? 1 : 0.3
                  })`}
                  strokeWidth={line.strokeWidth}
                  tension={0.5}
                  lineCap="round"
                  lineJoin="round"
                  globalCompositeOperation={
                    line.tool === "eraser" ? "destination-out" : "source-over"
                  }
                />
              ))}
            </Layer>
          </Stage>
        </div>
      )}

      <div className="image-downloads-buttons">
        <div
          ref={penButtonRef}
          onClick={() => handlePenClick()}
          className={`image-button ${
            isPenSliderShow ? "image-button-active" : ""
          }`}
        >
          {isPenSliderShow && (
            <input
              type="range"
              min="1"
              max="100"
              value={strokeWidth}
              onChange={(e) => handlePenSliderChange(parseInt(e.target.value))}
              className="vertical-slider"
              orient="vertical"
            />
          )}
          <img src={pen} alt="Pen" />
        </div>
        <div
          ref={eraserButtonRef}
          onClick={() => handleEraserClick()}
          className={`image-button ${
            isEraserSliderShow ? "image-button-active" : ""
          }`}
        >
          {isEraserSliderShow && (
            <input
              type="range"
              min="1"
              max="100"
              value={strokeWidth}
              onChange={(e) => handlePenSliderChange(parseInt(e.target.value))}
              className="vertical-slider"
              orient="vertical"
            />
          )}
          <img src={erazer} alt="Eraser" />
        </div>
        <button
          onClick={undoLastLine}
          disabled={lines.length === 0}
          className="image-button"
        >
          <img src={undo} alt="Undo" />
        </button>
        <button onClick={downloadImage} className="image-button">
          <img src={downloadIco} alt="Download" />
        </button>
      </div>
    </div>
  );
};

export default ImageAnnotator;

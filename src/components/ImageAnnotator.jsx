import React, { useState, useRef } from "react";
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
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokeWidth, setStrokeWidth] = useState(40);
  const [tool, setTool] = useState("pen");
  const [eraserRadius, setEraserRadius] = useState(40);

  const [imageWidth, setImageWidth] = useState(null);
  const [imageHeight, setImageHeight] = useState(null);

  const imageRef = useRef();

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      const img = new window.Image();
      img.src = reader.result;
      img.onload = () => {
        setImage(img);
        setImageWidth(img.width); // Устанавливаем ширину изображения
        setImageHeight(img.height); // Устанавливаем высоту изображения
      };
    };
    reader.readAsDataURL(file);
  };

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    const { x, y } = e.target.getStage().getPointerPosition();
    setLines([...lines, { points: [x, y], strokeWidth, tool }]);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    const lastLineIndex = lines.length - 1;

    if (lastLineIndex < 0) return;

    const lastLine = lines[lastLineIndex];
    const updatedLine = {
      ...lastLine,
      points: lastLine.points.concat([point.x, point.y]),
    };

    if (tool === "eraser") {
      const updatedLines = lines
        .map((line) => ({
          ...line,
          points: eraseLine(line, point, eraserRadius),
        }))
        .filter((line) => line.points.length > 0);

      setLines(updatedLines);
    } else {
      setLines(lines.slice(0, -1).concat(updatedLine));
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const eraseLine = (line, point, radius) => {
    const newPoints = [];
    for (let i = 0; i < line.points.length; i += 2) {
      const px = line.points[i];
      const py = line.points[i + 1];
      const dist = Math.hypot(px - point.x, py - point.y);
      if (dist > radius) {
        newPoints.push(px, py);
      }
    }
    return newPoints;
  };

  const undoLastLine = () => {
    setLines(lines.slice(0, -1));
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="image-annotator-container">
      {imageWidth && imageHeight && (
        <div className="screen-resolution">
          <img src={width} />
          <p className="screen-resolution-text">
            {imageWidth}x{imageHeight}
          </p>
        </div>
      )}

      {!image && (
        <div {...getRootProps()} className="drag-drop-container">
          <input {...getInputProps()} />
          <img src={tits} />
          DROP HERE
          <img src={downloadIco} />
        </div>
      )}

      {image && (
        <div className="image-container">
          <Stage
            width={image.width}
            height={image.height}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            <Layer>
              <Image image={image} ref={imageRef} />
              {lines.map((line, i) => (
                <Line
                  key={i}
                  points={line.points}
                  stroke={
                    line.tool === "pen"
                      ? "rgba(255, 105, 180, 0.5)"
                      : "rgba(0,0,0,0)"
                  }
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
        <button onClick={() => setTool("pen")} className="image-button">
          <img src={pen} />
        </button>
        <button onClick={() => setTool("eraser")} className="image-button">
          <img src={erazer} />
        </button>
        <button
          onClick={undoLastLine}
          disabled={lines.length === 0}
          className="image-button"
        >
          <img src={undo} />
        </button>
      </div>
    </div>
  );
};

export default ImageAnnotator;

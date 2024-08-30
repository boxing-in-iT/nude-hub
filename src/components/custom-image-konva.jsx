import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Image, Line } from "react-konva";
import { useDropzone } from "react-dropzone";
import pen from "../assets/image/pen.svg";
import erazer from "../assets/image/erazer.svg";
import undo from "../assets/image/undo.svg";
import tits from "../assets/image/tits.svg";
import downloadIco from "../assets/image/downloadIco.svg";
import width from "../assets/image/width.svg";
import Konva from "konva";

const Test = () => {
  const [image, setImage] = useState(null);
  const [lines, setLines] = useState([]); // Состояние для хранения всех линий
  const stageRef = useRef(null);
  const imageLayerRef = useRef(null);
  const drawingLayerRef = useRef(null);
  const [tool, setTool] = useState("brush");
  const [strokeWidth, setStrokeWidth] = useState(10);

  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  console.log(size);

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
      };
    };
    reader.readAsDataURL(file);
  };

  const fitImage = (imgElement, containerWidth, containerHeight) => {
    const imageRatio = imgElement.width / imgElement.height;
    const containerRatio = containerWidth / containerHeight;

    let newWidth, newHeight;

    if (imageRatio > containerRatio) {
      newWidth = containerWidth;
      newHeight = containerWidth / imageRatio;
    } else {
      newHeight = containerHeight;
      newWidth = containerHeight * imageRatio;
    }

    return { width: newWidth, height: newHeight };
  };

  useEffect(() => {
    if (image) {
      const stage = stageRef.current;

      const imageLayer = new Konva.Layer();
      const drawingLayer = new Konva.Layer();

      stage.add(imageLayer);
      stage.add(drawingLayer);

      imageLayerRef.current = imageLayer;
      drawingLayerRef.current = drawingLayer;

      const { width, height } = fitImage(image, stage.width(), stage.height());

      const konvaImage = new Konva.Image({
        x: 0,
        y: 0,
        image: image,
        width: width,
        height: height,
        draggable: false,
      });

      imageLayer.add(konvaImage);
      imageLayer.draw();

      let isPaint = false;
      let lastLine;

      stage.on("mousedown touchstart", () => {
        isPaint = true;
        const pos = stage.getPointerPosition();
        lastLine = new Konva.Line({
          stroke: tool === "brush" ? "#df4b26" : "transparent",
          strokeWidth: strokeWidth,
          globalCompositeOperation:
            tool === "brush" ? "source-over" : "destination-out",
          lineCap: "round",
          lineJoin: "round",
          points: [pos.x, pos.y],
        });
        drawingLayer.add(lastLine);
        setLines([...lines, lastLine]); // Добавляем линию в состояние
      });

      stage.on("mouseup touchend", () => {
        isPaint = false;
      });

      stage.on("mousemove touchmove", (e) => {
        if (!isPaint) return;
        e.evt.preventDefault();
        const pos = stage.getPointerPosition();
        const newPoints = lastLine.points().concat([pos.x, pos.y]);
        lastLine.points(newPoints);
        drawingLayer.batchDraw();
      });

      const handleResize = () => {
        const { width, height } = fitImage(
          image,
          stage.width(),
          stage.height()
        );
        konvaImage.width(width);
        konvaImage.height(height);
        imageLayer.batchDraw();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [image, tool, lines, strokeWidth]); // Добавляем зависимость от strokeWidth

  useEffect(() => {
    if (drawingLayerRef.current) {
      const drawingLayer = drawingLayerRef.current;
      drawingLayer.clear(); // Очистка слоя
      lines.forEach((line) => {
        drawingLayer.add(line); // Перерисовка всех линий из состояния
      });
      drawingLayer.batchDraw();
    }
  }, [lines, tool]);

  const undoLastLine = () => {
    setLines(lines.slice(0, -1));
  };

  // const handleMouseDown = (e) => {
  //   isDrawing.current = true;
  //   const pos = e.target.getStage().getPointerPosition();
  //   setLines([...lines, { tool, points: [pos.x, pos.y], strokeWidth }]);
  // };

  // const handleMouseMove = (e) => {
  //   if (!isDrawing.current) {
  //     return;
  //   }
  //   const stage = e.target.getStage();
  //   const point = stage.getPointerPosition();
  //   let lastLine = lines[lines.length - 1];
  //   lastLine.points = lastLine.points.concat([point.x, point.y]);
  //   lines.splice(lines.length - 1, 1, lastLine);
  //   setLines(lines.concat());
  // };

  // const handleMouseUp = () => {
  //   isDrawing.current = false;
  // };

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
      {/* {imageWidth && imageHeight && (
        <div className="screen-resolution">
          <img src={width} alt="Resolution" />
          <p className="screen-resolution-text">
            {imageWidth}x{imageHeight}
          </p>
        </div>
      )} */}

      {!image && (
        <div {...getRootProps()} className="drag-drop-container">
          <input {...getInputProps()} />
          <img src={tits} alt="Drop Here" className="drag-drop-tits" />
          DROP HERE
          <img src={downloadIco} alt="Download Icon" className="download-ico" />
        </div>
      )}

      <div className="image-container">
        <Stage width={600} height={600} ref={stageRef}>
          <Layer ref={imageLayerRef}></Layer>
          <Layer ref={drawingLayerRef}></Layer>
        </Stage>
      </div>

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

export default Test;

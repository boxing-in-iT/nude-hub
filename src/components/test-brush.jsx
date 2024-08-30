import React, { useState } from "react";
import { Stage, Layer, Line, Image as KonvaImage } from "react-konva";

const DrawingApp = () => {
  const [image, setImage] = useState(null);

  const [isPaint, setIsPaint] = useState(false);
  const [mode, setMode] = useState("brush");
  const [lines, setLines] = useState([]);
  const stageRef = React.useRef(null);

  const handleMouseDown = (e) => {
    setIsPaint(true);
    const stage = stageRef.current;
    const pos = stage.getPointerPosition();
    setLines((prevLines) => [
      ...prevLines,
      {
        points: [pos.x, pos.y],
        stroke: "#df4b26",
        strokeWidth: 5,
        globalCompositeOperation:
          mode === "brush" ? "source-over" : "destination-out",
        lineCap: "round",
        lineJoin: "round",
      },
    ]);
  };

  const handleMouseMove = (e) => {
    if (!isPaint) return;

    const stage = stageRef.current;
    const pos = stage.getPointerPosition();
    const updatedLines = lines.slice();
    updatedLines[updatedLines.length - 1].points = [
      ...updatedLines[updatedLines.length - 1].points,
      pos.x,
      pos.y,
    ];
    setLines(updatedLines);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const img = new window.Image(); // Используем window.Image для создания изображения
      img.src = reader.result;
      img.onload = () => {
        setImage(img);
      };
    };
    reader.readAsDataURL(file);
  };

  const handleMouseUp = () => {
    setIsPaint(false);
  };

  const handleChangeTool = (e) => {
    setMode(e.target.value);
  };

  return (
    <div>
      <div>
        <label htmlFor="image-upload">Upload Image</label>
        <input type="file" id="image-upload" onChange={handleImageUpload} />
      </div>
      Tool:
      <select id="tool" onChange={handleChangeTool}>
        <option value="brush">Brush</option>
        <option value="eraser">Eraser</option>
      </select>
      <div
        id="container"
        style={{ width: "100vw", height: "calc(100vh - 25px)" }}
      >
        <Stage
          width={600}
          height={600}
          onMouseDown={handleMouseDown}
          onMousemove={handleMouseMove}
          onMouseup={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
          ref={stageRef}
        >
          <Layer>
            {lines.map((line, i) => (
              <Line
                key={i}
                points={line.points}
                stroke={line.stroke}
                strokeWidth={line.strokeWidth}
                globalCompositeOperation={line.globalCompositeOperation}
                lineCap={line.lineCap}
                lineJoin={line.lineJoin}
              />
            ))}
          </Layer>
          <Layer>{image && <KonvaImage image={image} />}</Layer>
        </Stage>
      </div>
    </div>
  );
};

export default DrawingApp;

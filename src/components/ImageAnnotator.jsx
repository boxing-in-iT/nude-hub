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
  const [eraserRadius, setEraserRadius] = useState(40);

  const [imageWidth, setImageWidth] = useState(null);
  const [imageHeight, setImageHeight] = useState(null);

  const imageRef = useRef();
  const stageRef = useRef(); // Reference for the Stage component

  const [isPenSliderShow, setIsPenSliderShow] = useState(false);
  const [isEraserSliderShow, setIsEraserSliderShow] = useState(false);

  const penButtonRef = useRef();
  const eraserButtonRef = useRef();

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
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

  const handleEraserSliderChange = (value) => {
    setEraserRadius(value);
  };

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
          <img src={tits} alt="Drop Here" />
          DROP HERE
          <img src={downloadIco} alt="Download Icon" />
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
            ref={stageRef} // Assign the reference here
          >
            <Layer>
              <Image
                className="drop-n-drag-image"
                image={image}
                ref={imageRef}
              />
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
              value={eraserRadius}
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

// import React, { useState, useRef, useEffect } from "react";
// import { Stage, Layer, Image, Line } from "react-konva";
// import { useDropzone } from "react-dropzone";
// import pen from "../assets/image/pen.svg";
// import erazer from "../assets/image/erazer.svg";
// import undo from "../assets/image/undo.svg";
// import tits from "../assets/image/tits.svg";
// import downloadIco from "../assets/image/downloadIco.svg";
// import width from "../assets/image/width.svg";

// const ImageAnnotator = () => {
//   const [image, setImage] = useState(null);
//   const [lines, setLines] = useState([]);
//   // const [isDrawing, setIsDrawing] = useState(false);
//   const isDrawing = useRef(false);
//   const [strokeWidth, setStrokeWidth] = useState(10);
//   const [tool, setTool] = useState("pen");
//   const [eraserRadius, setEraserRadius] = useState(40);

//   const [imageWidth, setImageWidth] = useState(null);
//   const [imageHeight, setImageHeight] = useState(null);

//   const imageRef = useRef();

//   const [isPenSliderShow, setIsPenSliderShow] = useState(false);
//   const [isEraserSliderShow, setIsEraserSliderShow] = useState(false);

//   const penButtonRef = useRef();
//   const eraserButtonRef = useRef();

//   const onDrop = (acceptedFiles) => {
//     const file = acceptedFiles[0];
//     const reader = new FileReader();

//     reader.onload = () => {
//       const img = new window.Image();
//       img.src = reader.result;
//       img.onload = () => {
//         setImage(img);
//         setImageWidth(img.width);
//         setImageHeight(img.height);
//       };
//     };
//     reader.readAsDataURL(file);
//   };

//   const undoLastLine = () => {
//     setLines(lines.slice(0, -1));
//   };

//   const handleMouseDown = (e) => {
//     isDrawing.current = true;
//     const pos = e.target.getStage().getPointerPosition();
//     setLines([...lines, { tool, points: [pos.x, pos.y], strokeWidth }]);
//   };

//   // const handleMouseDown = (e) => {
//   //   isDrawing.current = true;
//   //   const pos = e.target.getStage().getPointerPosition();
//   //   setLines([
//   //     ...lines,
//   //     {
//   //       tool,
//   //       points: [pos.x, pos.y],
//   //       strokeWidth: tool === "eraser" ? eraserRadius : strokeWidth,
//   //     },
//   //   ]);
//   // };

//   const handleMouseMove = (e) => {
//     // no drawing - skipping
//     if (!isDrawing.current) {
//       return;
//     }
//     const stage = e.target.getStage();
//     const point = stage.getPointerPosition();
//     let lastLine = lines[lines.length - 1];
//     // add point
//     lastLine.points = lastLine.points.concat([point.x, point.y]);

//     // replace last
//     lines.splice(lines.length - 1, 1, lastLine);
//     setLines(lines.concat());
//   };

//   const handleMouseUp = () => {
//     isDrawing.current = false;
//   };

//   const handlePenClick = () => {
//     setIsPenSliderShow(!isPenSliderShow);
//     setTool("pen");
//     setIsEraserSliderShow(false);
//   };

//   const handleEraserClick = () => {
//     setIsEraserSliderShow(!isEraserSliderShow);
//     setTool("eraser");
//     setIsPenSliderShow(false);
//   };

//   const handlePenSliderChange = (value) => {
//     setStrokeWidth(value);
//   };

//   const handleEraserSliderChange = (value) => {
//     setEraserRadius(value);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         penButtonRef.current &&
//         !penButtonRef.current.contains(event.target)
//       ) {
//         setIsPenSliderShow(false);
//       }
//       if (
//         eraserButtonRef.current &&
//         !eraserButtonRef.current.contains(event.target)
//       ) {
//         setIsEraserSliderShow(false);
//       }
//     };

//     document.addEventListener("click", handleClickOutside);
//     return () => {
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }, [penButtonRef, eraserButtonRef]);

//   const { getRootProps, getInputProps } = useDropzone({ onDrop });

//   return (
//     <div className="image-annotator-container">
//       {imageWidth && imageHeight && (
//         <div className="screen-resolution">
//           <img src={width} alt="Resolution" />
//           <p className="screen-resolution-text">
//             {imageWidth}x{imageHeight}
//           </p>
//         </div>
//       )}

//       {!image && (
//         <div {...getRootProps()} className="drag-drop-container">
//           <input {...getInputProps()} />
//           <img src={tits} alt="Drop Here" />
//           DROP HERE
//           <img src={downloadIco} alt="Download Icon" />
//         </div>
//       )}

//       {image && (
//         <div className="image-container">
//           <Stage
//             width={image.width}
//             height={image.height}
//             onMouseDown={handleMouseDown}
//             onMouseMove={handleMouseMove}
//             onMouseUp={handleMouseUp}
//           >
//             <Layer>
//               <Image image={image} ref={imageRef} />
//             </Layer>
//             <Layer>
//               {lines.map((line, i) => (
//                 <Line
//                   key={i}
//                   points={line.points}
//                   stroke={`rgba(255, 105, 180, ${
//                     line.tool === "eraser" ? 1 : 0.3
//                   })`} // Полупрозрачная линия
//                   strokeWidth={line.strokeWidth}
//                   tension={0.5}
//                   lineCap="round"
//                   lineJoin="round"
//                   globalCompositeOperation={
//                     line.tool === "eraser" ? "destination-out" : "source-over"
//                   }
//                 />
//               ))}
//             </Layer>
//           </Stage>
//         </div>
//       )}

//       <div className="image-downloads-buttons">
//         <div
//           ref={penButtonRef}
//           onClick={() => handlePenClick()}
//           className={`image-button ${
//             isPenSliderShow ? "image-button-active" : ""
//           }`}
//         >
//           {isPenSliderShow && (
//             <input
//               type="range"
//               min="1"
//               max="100"
//               value={strokeWidth}
//               onChange={(e) => handlePenSliderChange(parseInt(e.target.value))}
//               className="vertical-slider"
//               orient="vertical"
//             />
//           )}
//           <img src={pen} alt="Pen" />
//         </div>
//         <div
//           ref={eraserButtonRef}
//           onClick={() => handleEraserClick()}
//           className={`image-button ${
//             isEraserSliderShow ? "image-button-active" : ""
//           }`}
//         >
//           {isEraserSliderShow && (
//             <input
//               type="range"
//               min="1"
//               max="100"
//               value={eraserRadius}
//               onChange={(e) => handlePenSliderChange(parseInt(e.target.value))}
//               className="vertical-slider"
//               orient="vertical"
//             />
//           )}
//           <img src={erazer} alt="Eraser" />
//         </div>
//         <button
//           onClick={undoLastLine}
//           disabled={lines.length === 0}
//           className="image-button"
//         >
//           <img src={undo} alt="Undo" />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ImageAnnotator;

//This is the compoonent that is used to draw on the canvas and extract the text from the image

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const apiKeyVision = "AIzaSyCj5hRY6tg826SELZMcacxPpiCZMuY-VJ4";

const DrawingCanvas = ({ onExtract }) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 700;
    canvas.height = 900;

    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 5;
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);

    contextRef.current = context;
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    setIsDrawing(true);
    nativeEvent.preventDefault();
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;

    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    nativeEvent.preventDefault();
  };

  const stopDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };
  const setToDraw = () => {
    const canvas = canvasRef.current;
    canvas.classList.remove("eraser-cursor");
    contextRef.current.globalCompositeOperation = "source-over";
    contextRef.current.strokeStyle = "black";
    canvas.style.cursor = "crosshair"; // Optional: Set a default cursor style for drawing
  };

  const setToErase = () => {
    const canvas = canvasRef.current;
    canvas.classList.add("eraser-cursor");
    contextRef.current.globalCompositeOperation = "destination-out";
    contextRef.current.strokeStyle = "rgba(255,255,255,1)"; // Make the eraser white
  };

  const getBase64Image = () => {
    const canvas = canvasRef.current;
    return canvas.toDataURL("image/png").split(",")[1];
  };

  const handleImageUpload = async () => {
    if (isGenerating) return;

    const base64Image = getBase64Image();

    try {
      setIsGenerating(true);

      const visionResponse = await axios.post(
        `https://vision.googleapis.com/v1/images:annotate?key=${apiKeyVision}`,
        {
          requests: [
            {
              image: {
                content: base64Image,
              },
              features: [
                {
                  type: "DOCUMENT_TEXT_DETECTION",
                  maxResults: 1,
                },
              ],
            },
          ],
        }
      );

      const textAnnotations =
        visionResponse.data.responses[0]?.textAnnotations?.map(
          (annotation) => annotation.description
        ) || [];

      const fullText = textAnnotations.join(" ");
      onExtract(fullText);
    } catch (error) {
      console.error("Error detecting text:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="prescription-container">
      <canvas
        className="canvas-container"
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      ></canvas>
      <div className="controls">
        <button onClick={setToDraw}>Draw</button>
        <button onClick={setToErase}>Erase</button>
        <button onClick={handleImageUpload} disabled={isGenerating}>
          {isGenerating ? "Processing..." : "Extract Handwriting"}
        </button>
      </div>
    </div>
  );
};

export default DrawingCanvas;

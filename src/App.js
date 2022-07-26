import "./App.css";
import { useEffect, useRef } from "react";
import canvasTxt from "canvas-txt";

function App() {
  const canvasRef = useRef(null);
  const imgRef = useRef({ current: null });

  const drawOnCanvas = (text = "") => {
    canvasRef.current.width = imgRef.current.width;
    canvasRef.current.height = imgRef.current.height;
    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(
      imgRef.current,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );
    canvasCtx.fillStyle = "white";
    canvasTxt.font = "Verdana";
    canvasTxt.fontSize = 20;
    canvasTxt.lineHeight = 30;
    canvasTxt.drawText(
      canvasCtx,
      text,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );
  };

  useEffect(() => {
    const maskFilterImage = document.createElement("img", {
      ref: imgRef,
    });
    maskFilterImage.objectFit = "contain";
    maskFilterImage.onload = function () {
      imgRef.current = maskFilterImage;
      drawOnCanvas();
    };
    maskFilterImage.src = "images/sigma.jpg";
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="output_canvas"></canvas>
      <br />
      <textarea
        onChange={(evt) => {
          drawOnCanvas(evt.target.value);
        }}
        rows={5}
        cols={30}
        placeholder="Type text here"
      />
    </>
  );
}

export default App;

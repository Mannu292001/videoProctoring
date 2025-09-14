import React, { useEffect } from "react";

const VideoPlayer = ({ videoRef, canvasRef }) => {
  useEffect(() => {
    if (!videoRef?.current || !canvasRef?.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    };

    video.addEventListener("loadeddata", resizeCanvas);
    return () => video.removeEventListener("loadeddata", resizeCanvas);
  }, [videoRef, canvasRef]);

  return (
    <div className="relative inline-block">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="border rounded-lg"
        style={{ width: "400px", height: "300px" }}
      />
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 border rounded-lg"
        style={{ width: "400px", height: "300px" }}
      />
    </div>
  );
};


export default VideoPlayer;

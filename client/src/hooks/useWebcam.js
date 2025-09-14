// src/hooks/useWebcam.js
import { useEffect, useRef, useState } from "react";

export default function useWebcam({ videoConstraints = { width: 640, height: 480, facingMode: "user" } } = {}) {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function start() {
      try {
        const s = await navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true });
        if (!mounted) {
          s.getTracks().forEach((t) => t.stop());
          return;
        }
        setStream(s);
        if (videoRef.current) videoRef.current.srcObject = s;
      } catch (err) {
        setError(err);
        console.error("Webcam error:", err);
      }
    }
    start();
    return () => {
      mounted = false;
      if (stream) stream.getTracks().forEach((t) => t.stop());
    };
  }, []);

  return { videoRef, stream, error };
}

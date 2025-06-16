import { useEffect, useRef } from "react";

export default function CameraScanner({ onCapture, onCancel }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { exact: "environment" } }
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        alert("No se pudo acceder a la cámara: " + err.message);
      }
    };

    startCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleCapture = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (canvas && video) {
      const context = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0);
      const dataURL = canvas.toDataURL("image/jpeg");
      onCapture(dataURL);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* VIDEO A PANTALLA COMPLETA */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />

      {/* CANVAS OCULTO */}
      <canvas ref={canvasRef} className="hidden" />

      {/* BOTÓN CANCELAR */}
      <button
        onClick={onCancel}
        className="absolute top-4 left-4 bg-white text-black px-4 py-2 rounded z-10 shadow"
      >
        Cancelar
      </button>

      {/* INDICADOR CENTRAR */}
      <div className="absolute bottom-24 w-full text-center text-white text-sm z-10">
        Centra el documento aquí
      </div>

      {/* BOTÓN CAPTURAR */}
      <button
        onClick={handleCapture}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-full z-10 shadow-lg"
      >
        Capturar
      </button>
    </div>
  );
}

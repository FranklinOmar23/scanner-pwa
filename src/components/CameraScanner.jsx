import { useEffect, useRef } from "react";

export default function CameraScanner({ onCapture, onCancel }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { exact: "environment" } } // cámara trasera
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        alert("No se pudo acceder a la cámara: " + err.message);
      }
    };

    startCamera();

    // Detener la cámara cuando se desmonta
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
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-full max-w-md aspect-video bg-black rounded overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover rounded"
        />
        <p className="absolute inset-x-0 bottom-2 text-center text-sm bg-black bg-opacity-50 text-white py-1 rounded">
          Centra el documento aquí
        </p>
      </div>

      <canvas ref={canvasRef} className="hidden" />

      <div className="flex gap-4 mt-4">
        <button
          onClick={onCancel}
          className="bg-white border border-gray-400 text-gray-700 px-4 py-2 rounded hover:bg-gray-100"
        >
          Cancelar
        </button>
        <button
          onClick={handleCapture}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Capturar
        </button>
      </div>
    </div>
  );
}

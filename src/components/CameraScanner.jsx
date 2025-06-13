import { useEffect, useRef } from "react";

export default function CameraScanner({ onCapture, onCancel }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
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
    <div className="flex flex-col items-center gap-4">
      <div className="relative bg-black rounded-lg overflow-hidden">
        <video ref={videoRef} autoPlay className="w-full max-w-md rounded" />
        <p className="absolute text-white bg-black bg-opacity-60 px-2 py-1 text-sm rounded bottom-2 left-2">
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

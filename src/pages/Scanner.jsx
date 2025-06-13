import { useState } from "react";
import CameraScanner from "../components/CameraScanner";
import ImagePreview from "../components/ImagePreview";
import PdfOptions from "../components/PdfOptions";
import { useNavigate } from "react-router-dom";

export default function Scanner() {
  const [images, setImages] = useState([]); // lista de imágenes confirmadas
  const [currentImage, setCurrentImage] = useState(null); // imagen recién capturada
  const [step, setStep] = useState("camera"); // camera | preview
  const navigate = useNavigate();

  const handleCapture = (dataUrl) => {
    setCurrentImage(dataUrl);
    setStep("preview");
  };

  const handleConfirm = () => {
    setImages((prev) => [...prev, currentImage]);
    setCurrentImage(null);
    setStep("camera");
  };

  const handleRepeat = () => {
    setCurrentImage(null);
    setStep("camera");
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-blue-50 px-4 py-6 text-center">
      <header className="text-lg font-semibold mb-4">Scanner App</header>

      {step === "camera" && (
        <CameraScanner onCapture={handleCapture} onCancel={handleCancel} />
      )}

      {step === "preview" && currentImage && (
        <div className="flex flex-col items-center gap-4">
          <img
            src={currentImage}
            alt="Captured document"
            className="max-w-full rounded shadow border bg-white"
          />

          <div className="grid grid-cols-2 gap-4 w-full max-w-md mt-4">
            <button
              onClick={handleRepeat}
              className="bg-white border text-gray-800 py-2 rounded shadow hover:bg-gray-100"
            >
              Repetir
            </button>
            <button
              onClick={handleConfirm}
              className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Confirmar
            </button>
          </div>

          <button
            onClick={handleCancel}
            className="mt-2 bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
          >
            Cancelar
          </button>
        </div>
      )}

      {images.length > 0 && step === "camera" && (
        <>
          <ImagePreview images={images} />
          <PdfOptions images={images} />
        </>
      )}
    </div>
  );
}

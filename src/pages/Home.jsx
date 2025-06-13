import ScannerButton from "../components/ScannerButton";
import { Camera } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-blue-50 text-center px-4">
      <header className="absolute top-0 left-0 w-full p-4 text-center font-semibold text-lg bg-white shadow-sm">
        Scanner App
      </header>

      <div className="flex flex-col items-center mt-16">
        <div className="bg-blue-600 text-white rounded-full p-6 mb-4">
          <Camera size={40} />
        </div>

        <h1 className="text-2xl font-bold mb-2">¡Bienvenido a tu amigable Scanner!</h1>
        <p className="text-gray-600 mb-6 max-w-sm">
          Escanea documentos fácilmente y conviértelos a PDF para compartir o guardar
        </p>

        <ScannerButton />
      </div>
    </div>
  );
}

import { useNavigate } from "react-router-dom";
import { Camera } from "lucide-react";

export default function ScannerButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/scanner")}
      className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 flex items-center justify-center gap-2 text-lg"
    >
      <Camera size={20} />
      Escanear
    </button>
  );
}

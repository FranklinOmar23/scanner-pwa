import React from "react";

export default function ImagePreview({ images }) {
  if (!images.length) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
      {images.map((img, i) => (
        <div key={i} className="border rounded overflow-hidden shadow bg-white p-2">
          <img src={img} alt={`Escaneado ${i + 1}`} className="w-full object-contain" />
          <p className="text-xs text-center text-gray-500 mt-1">Documento {i + 1}</p>
        </div>
      ))}
    </div>
  );
}

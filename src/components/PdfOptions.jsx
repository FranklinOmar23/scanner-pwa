import jsPDF from "jspdf";

export default function PdfOptions({ images }) {
  const generarPDFUnificado = () => {
    const pdf = new jsPDF();
    images.forEach((img, i) => {
      if (i !== 0) pdf.addPage();
      pdf.addImage(img, "JPEG", 10, 10, 190, 250);
    });
    pdf.save("documento_unificado.pdf");
  };

  const generarPDFSeparado = () => {
    images.forEach((img, i) => {
      const pdf = new jsPDF();
      pdf.addImage(img, "JPEG", 10, 10, 190, 250);
      pdf.save(`documento_${i + 1}.pdf`);
    });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
      <button
        onClick={generarPDFUnificado}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        Unir en un solo PDF
      </button>
      <button
        onClick={generarPDFSeparado}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Guardar por separado
      </button>
    </div>
  );
}

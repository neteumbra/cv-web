import { useStore } from '@nanostores/react';
import { PDFViewer } from '@react-pdf/renderer';
import { CvDocument } from '../lib/cv';
import { $cvData } from '../stores/cv';

/** Isla de previsualización: el preview ES el PDF real (WYSIWYG). */
export default function PdfPreview() {
  const cvData = useStore($cvData);

  if (!cvData) {
    return <p className="p-4 text-sm text-gray-500">Escribe un CV para ver la previsualización…</p>;
  }

  return (
    <PDFViewer style={{ width: '100%', height: '100%' }} showToolbar={false}>
      <CvDocument cvData={cvData} />
    </PDFViewer>
  );
}

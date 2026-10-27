import { useStore } from '@nanostores/react';
import { PDFViewer } from '@react-pdf/renderer';
import { CvDocument } from '../lib/cv';
import { $cvData } from '../stores/cv';
import { useT } from '../i18n/react';

/** Isla de previsualización: el preview ES el PDF real (WYSIWYG). */
export default function PdfPreview() {
  const cvData = useStore($cvData);
  const t = useT();

  if (!cvData) {
    return (
      <div className="preview-empty">
        <p>{t('tb.empty')}</p>
      </div>
    );
  }

  return (
    <div className="preview">
      <div className="preview-frame">
        <PDFViewer style={{ width: '100%', height: '100%' }} showToolbar={false}>
          <CvDocument cvData={cvData} />
        </PDFViewer>
      </div>
    </div>
  );
}

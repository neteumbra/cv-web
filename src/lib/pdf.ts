import { createElement } from 'react';
import { pdf } from '@react-pdf/renderer';
import { CvDocument } from './cv';
import type { CvData } from './cv';

/** Genera el PDF en el navegador (blob local) y lo descarga. Sin servidor. */
export async function downloadPdf(cvData: CvData, filename = 'cv.pdf'): Promise<void> {
  const blob = await pdf(createElement(CvDocument, { cvData })).toBlob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

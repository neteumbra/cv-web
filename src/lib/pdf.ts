import { createElement } from 'react';
import type { ReactElement } from 'react';
import { pdf } from '@react-pdf/renderer';
import type { DocumentProps } from '@react-pdf/renderer';
import { CvDocument } from './cv';
import type { CvData } from './cv';

/** URL-friendly slug del nombre del CV ("Alex García" -> "alex-garcia"). */
export function slugify(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

/**
 * Descarga un blob de forma fiable.
 *
 * IMPORTANTE: la URL NO se revoca en el mismo tick del click(). Hacerlo mataba
 * la descarga (archivo de 0 bytes o corrupto en Firefox/Safari/Chrome bajo carga).
 * También se añade el <a> al DOM, que es necesario en Safari.
 */
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.rel = 'noopener';
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();

  window.setTimeout(() => {
    URL.revokeObjectURL(url);
    a.remove();
  }, 10_000);
}

/** Genera el PDF en el navegador (blob local) y lo descarga. Sin servidor. */
export async function downloadPdf(cvData: CvData): Promise<void> {
  // `CvDocument` es un componente propio que renderiza <Document> por dentro;
  // los tipos de `pdf()` sólo admiten el elemento <Document> directo: de ahí el cast.
  const doc = createElement(CvDocument, { cvData }) as unknown as ReactElement<DocumentProps>;
  const blob = await pdf(doc).toBlob();
  const slug = slugify(cvData.contact.name ?? '');
  downloadBlob(blob, slug ? `cv-${slug}.pdf` : 'cv.pdf');
}

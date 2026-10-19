import { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { PDFViewer } from '@react-pdf/renderer';
import { CvDocument } from '../lib/cv';
import { $cvData } from '../stores/cv';
import { dict, type Lang } from '../i18n/dict';

function currentLang(): Lang {
  return document.documentElement.lang === 'en' ? 'en' : 'es';
}

/** Isla de previsualización: el preview ES el PDF real (WYSIWYG). */
export default function PdfPreview() {
  const cvData = useStore($cvData);
  const [lang, setLang] = useState<Lang>('es');

  useEffect(() => {
    setLang(currentLang());
    const onLang = () => setLang(currentLang());
    window.addEventListener('cv-lang', onLang);
    return () => window.removeEventListener('cv-lang', onLang);
  }, []);

  if (!cvData) {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
        }}
      >
        <p style={{ color: 'var(--muted)', fontSize: 13 }}>{dict['tb.empty'][lang]}</p>
      </div>
    );
  }

  return (
    <PDFViewer style={{ width: '100%', height: '100%' }} showToolbar={false}>
      <CvDocument cvData={cvData} />
    </PDFViewer>
  );
}

import { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { $markdown, $cvData } from '../stores/cv';
import { downloadPdf } from '../lib/pdf';
import { dict, type Lang } from '../i18n/dict';
import defaultMd from '../data/default.md?raw';

function currentLang(): Lang {
  return document.documentElement.lang === 'en' ? 'en' : 'es';
}

function saveText(text: string, filename: string) {
  const url = URL.createObjectURL(new Blob([text], { type: 'text/markdown' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/** Isla de acciones: descargar PDF/Markdown, importar Markdown, resetear. */
export default function Toolbar() {
  const cvData = useStore($cvData);
  const [lang, setLang] = useState<Lang>('es');

  useEffect(() => {
    setLang(currentLang());
    const onLang = () => setLang(currentLang());
    window.addEventListener('cv-lang', onLang);
    return () => window.removeEventListener('cv-lang', onLang);
  }, []);

  const t = (key: string) => dict[key]?.[lang] ?? key;

  return (
    <header className="toolbar">
      <strong className="brand">cv-web</strong>

      <button disabled={!cvData} onClick={() => cvData && downloadPdf(cvData)}>
        {t('tb.pdf')}
      </button>

      <button onClick={() => saveText($markdown.get(), 'cv.md')}>{t('tb.down')}</button>

      <label className="btn">
        {t('tb.up')}
        <input
          type="file"
          accept=".md,text/markdown"
          hidden
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) file.text().then((txt) => $markdown.set(txt));
            e.target.value = '';
          }}
        />
      </label>

      <button
        onClick={() => {
          if (confirm(t('tb.reset.confirm'))) {
            $markdown.set(defaultMd);
          }
        }}
      >
        {t('tb.reset')}
      </button>

      <span className="status">{t('tb.status')}</span>
    </header>
  );
}

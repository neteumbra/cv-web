import { useStore } from '@nanostores/react';
import { $markdown, $cvData } from '../stores/cv';
import { downloadPdf } from '../lib/pdf';
import defaultMd from '../data/default.md?raw';

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

  return (
    <header className="toolbar">
      <strong className="brand">cv-web</strong>

      <button disabled={!cvData} onClick={() => cvData && downloadPdf(cvData)}>
        ⤓ PDF
      </button>

      <button onClick={() => saveText($markdown.get(), 'cv.md')}>↓ Markdown</button>

      <label className="btn">
        ↑ Markdown
        <input
          type="file"
          accept=".md,text/markdown"
          hidden
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) file.text().then((t) => $markdown.set(t));
            e.target.value = '';
          }}
        />
      </label>

      <button
        onClick={() => {
          if (confirm('¿Restablecer al CV de ejemplo? Se perderán tus cambios locales.')) {
            $markdown.set(defaultMd);
          }
        }}
      >
        ↺ Reset
      </button>

      <span className="status">● Guardado local · nada sale de tu navegador</span>
    </header>
  );
}

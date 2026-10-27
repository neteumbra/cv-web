import { useRef } from 'react';
import { useStore } from '@nanostores/react';
import { $markdown, $cvData } from '../stores/cv';
import { downloadPdf, downloadBlob, slugify } from '../lib/pdf';
import { markdownToCv, cvToMarkdown, formatIsLossless } from '../lib/cv';
import { toast } from '../lib/toast';
import { $lang } from '../i18n/lang';
import { dict, type DictKey } from '../i18n/dict';
import { examples } from '../data/examples';
import ResetDialog from './ResetDialog';

function saveText(text: string, filename: string) {
  downloadBlob(new Blob([text], { type: 'text/markdown' }), filename);
}

/** Isla de acciones: PDF, formateo, exportar Markdown, resetear. */
export default function Toolbar() {
  const cvData = useStore($cvData);
  const lang = useStore($lang);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const t = (key: DictKey) => dict[key][lang];

  const onDownloadPdf = async () => {
    if (!cvData) return;
    try {
      await downloadPdf(cvData);
      toast(t('tb.pdf.done'));
    } catch {
      toast(t('tb.pdf.error'), 'error');
    }
  };

  const onFormat = () => {
    const source = $markdown.get();
    try {
      const cv = markdownToCv(source);
      if (!cv.contact.name || !cv.sections.length) {
        toast(t('tb.format.invalid'), 'error');
        return;
      }
      const formatted = cvToMarkdown(cv);
      if (formatted === source.trim()) {
        toast(t('tb.format.none'));
        return;
      }
      // Red de seguridad: si el formateo perdería líneas, no se aplica.
      if (!formatIsLossless(source, formatted)) {
        toast(t('tb.format.loss'), 'error');
        return;
      }
      $markdown.set(formatted);
      toast(t('tb.format.done'));
    } catch {
      toast(t('tb.format.invalid'), 'error');
    }
  };

  const onResetClose = () => {
    if (dialogRef.current?.returnValue === 'confirm') {
      // El ejemplo se elige según el idioma activo: en EN se reinicia en EN.
      $markdown.set(examples[lang]);
      toast(t('tb.reset.done'));
    }
  };

  return (
    <header className="toolbar">
      <div className="tb-group tb-primary">
        <button
          className="btn btn-primary"
          disabled={!cvData}
          title={t('tb.pdf.hint')}
          onClick={onDownloadPdf}
        >
          {t('tb.pdf')}
        </button>
      </div>

      <span className="tb-sep" aria-hidden="true" />

      <div className="tb-group">
        <button className="btn" title={t('tb.format.hint')} onClick={onFormat}>
          {t('tb.format')}
        </button>

        <button
          className="btn"
          title={t('tb.down.hint')}
          onClick={() => {
            const slug = slugify(cvData?.contact.name ?? '');
            saveText($markdown.get(), slug ? `cv-${slug}.md` : 'cv.md');
            toast(t('tb.down.done'));
          }}
        >
          {t('tb.down')}
        </button>

        <button className="btn" onClick={() => dialogRef.current?.showModal()}>
          {t('tb.reset')}
        </button>
      </div>

      <span className="tb-status" title={t('tb.status.hint')}>
        <i className="dot" aria-hidden="true" />
        {t('tb.status')}
      </span>

      <ResetDialog ref={dialogRef} onClose={onResetClose} />
    </header>
  );
}

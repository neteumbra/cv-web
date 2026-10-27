import type { Ref } from 'react';
import { useT } from '../i18n/react';

type Props = {
  /** El diálogo se abre desde el padre con `dialogRef.current?.showModal()`. */
  ref: Ref<HTMLDialogElement>;
  /** Se dispara al cerrarse; el padre comprueba `returnValue === 'confirm'`. */
  onClose: () => void;
};

/**
 * Confirmación de «↺ Reiniciar». Un `<dialog>` propio: nunca `window.confirm`
 * (regla 1 de AGENTS.md). Todo el contenido va dentro de un
 * `<form method="dialog">` para que los botones cierren y fijen `returnValue`.
 */
export default function ResetDialog({ ref, onClose }: Props) {
  const t = useT();

  return (
    <dialog ref={ref} className="modal" aria-labelledby="reset-title" onClose={onClose}>
      <form method="dialog">
        <div className="modal-head">
          <h2 id="reset-title">{t('tb.reset.title')}</h2>
          <button className="icon-btn" value="cancel" aria-label={t('tb.reset.cancel')}>
            ✕
          </button>
        </div>
        <div className="modal-body">
          <p>{t('tb.reset.confirm')}</p>
          <div className="modal-actions">
            <button className="btn btn-primary" type="submit" value="confirm">
              {t('tb.reset.ok')}
            </button>
            <button className="btn" type="submit" value="cancel">
              {t('tb.reset.cancel')}
            </button>
          </div>
        </div>
      </form>
    </dialog>
  );
}

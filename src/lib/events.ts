import type { Lang } from '../i18n/dict';

/**
 * Eventos globales de la app. Antes eran strings sueltos repartidos por los
 * ficheros ('cv-lang' ×9, 'cv-toast' ×2); aquí viven una sola vez y tipados.
 * Si se añade un evento nuevo, se declara aquí y en ningún otro sitio.
 */
export const CV_LANG = 'cv-lang';
export const CV_TOAST = 'cv-toast';

export type ToastDetail = { text: string; tone?: 'ok' | 'error' };

const emit = <T>(name: string, detail: T): void => {
  window.dispatchEvent(new CustomEvent(name, { detail }));
};

export const emitLang = (lang: Lang): void => emit(CV_LANG, lang);
export const emitToast = (detail: ToastDetail): void => emit(CV_TOAST, detail);

/**
 * Suscripción al cambio de idioma. Devuelve el `removeEventListener`, listo
 * para el cleanup de un `useEffect` de React.
 */
export const onLang = (cb: (lang: Lang) => void): (() => void) => {
  const handler = (e: Event) => cb((e as CustomEvent<Lang>).detail);
  window.addEventListener(CV_LANG, handler);
  return () => window.removeEventListener(CV_LANG, handler);
};

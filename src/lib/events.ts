/**
 * Eventos globales de la app. Antes eran strings sueltos repartidos por los
 * ficheros ('cv-lang' ×9, 'cv-toast' ×2); aquí viven una sola vez y tipados.
 * Si se añade un evento nuevo, se declara aquí y en ningún otro sitio.
 *
 * El de idioma desapareció en la Ronda 13: el idioma lo decide la URL, no un
 * estado de cliente, así que no hay nada que notificar al cambiarlo.
 */
export const CV_TOAST = 'cv-toast';

export type ToastDetail = { text: string; tone?: 'ok' | 'error' };

const emit = <T>(name: string, detail: T): void => {
  window.dispatchEvent(new CustomEvent(name, { detail }));
};

export const emitToast = (detail: ToastDetail): void => emit(CV_TOAST, detail);

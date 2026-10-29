import { atom } from 'nanostores';
import { dict, type DictKey, type Lang } from './dict';

/**
 * Idioma de la página. Lo decide la URL y lo fija el build en `<html lang>`:
 * español en la raíz (`/editor/`), inglés bajo `/en/` (`/en/editor/`).
 * El selector de idioma de la navbar son enlaces normales: al pulsarlo se
 * navega a la otra URL (el CV se mantiene, vive en `localStorage`).
 */
export function pageLang(): Lang {
  return typeof document !== 'undefined' && document.documentElement.lang === 'en'
    ? 'en'
    : 'es';
}

/**
 * Estado único del idioma, para React. Las islas son `client:only`, así que
 * al evaluarse este módulo el `<html lang>` del build ya está en el DOM.
 */
export const $lang = atom<Lang>(pageLang());

/** Traducción de una clave válida del diccionario. */
export function t(key: DictKey, lang: Lang): string {
  return dict[key][lang];
}

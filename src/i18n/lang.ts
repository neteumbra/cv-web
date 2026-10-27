import { atom } from 'nanostores';
import { dict, type DictKey, type Entry, type Lang } from './dict';
import { emitLang } from '../lib/events';

const KEY = 'cv-web:lang';

/** Idioma guardado: mismo criterio de siempre, sólo el valor 'en' activa inglés. */
export function readLang(): Lang {
  return typeof localStorage !== 'undefined' && localStorage.getItem(KEY) === 'en' ? 'en' : 'es';
}

/**
 * Estado único del idioma. En React se lee con `useStore($lang)` y ya no hace
 * falta un `useState` + listener `cv-lang` en cada componente.
 */
export const $lang = atom<Lang>(readLang());

/** Traducción de una clave válida del diccionario. */
export function t(key: DictKey, lang: Lang): string {
  return dict[key][lang];
}

/**
 * Tolerante a claves que llegan como string desde el DOM (`data-i18n`,
 * `dataset.i18nTitle`, etc.): no compilan como `DictKey` pero existen.
 */
export function entry(key: string): Entry | undefined {
  return key in dict ? dict[key as DictKey] : undefined;
}

/** Aplica el idioma al DOM (textos, `title`, `aria-label`, `<html lang>`). */
function apply(lang: Lang): void {
  document.documentElement.lang = lang;

  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    const e = entry(el.dataset.i18n ?? '');
    if (e) el.textContent = e[lang];
  });
  document.querySelectorAll<HTMLElement>('[data-i18n-title]').forEach((el) => {
    const e = entry(el.dataset.i18nTitle ?? '');
    if (e) el.setAttribute('title', e[lang]);
  });
  document.querySelectorAll<HTMLElement>('[data-i18n-aria]').forEach((el) => {
    const e = entry(el.dataset.i18nAria ?? '');
    if (e) el.setAttribute('aria-label', e[lang]);
  });

  // Título de la pestaña y meta description: su clave vive en <html> y en la
  // propia etiqueta <meta>, así el HTML del build sale del mismo diccionario.
  const docTitleKey = document.documentElement.dataset.docTitle;
  if (docTitleKey) {
    const e = entry(docTitleKey);
    if (e) document.title = e[lang];
  }
  const desc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  const descKey = desc?.dataset.i18nContent;
  if (desc && descKey) {
    const e = entry(descKey);
    if (e) desc.setAttribute('content', e[lang]);
  }

  // Etiqueta corta del segmento de idioma (el icono SVG no se toca)
  const langLabel = document.getElementById('lang-label');
  if (langLabel) langLabel.textContent = lang.toUpperCase();

  localStorage.setItem(KEY, lang);
  $lang.set(lang);
  emitLang(lang);
}

export function setLang(lang: Lang): void {
  apply(lang);
}

export function toggleLang(): void {
  apply($lang.get() === 'es' ? 'en' : 'es');
}

/**
 * Inicializa el i18n: aplica el idioma guardado y engancha el botón de la
 * navbar. Se llama una sola vez desde el script de Layout.astro.
 */
export function initI18n(): void {
  apply(readLang());
  document.getElementById('lang-toggle')?.addEventListener('click', () => toggleLang());
}

import { atom, computed } from 'nanostores';
import { markdownToCv } from '../lib/cv';
import { examples } from '../data/examples';
import { readLang } from '../i18n/lang';

const STORAGE_KEY = 'cv-web:markdown';

/** Fuente de verdad: el markdown escrito por el usuario. */
export const $markdown = atom<string>('');

/** CV parseado a partir del markdown (memoizado). */
export const $cvData = computed($markdown, (md) => {
  try {
    return markdownToCv(md);
  } catch {
    return undefined;
  }
});

// Inicialización + persistencia. Este módulo sólo se importa desde islas
// `client:only` y <script> (ambos 100% cliente), nunca se evalúa en SSR.
if (typeof localStorage !== 'undefined') {
  // Primer arranque: el ejemplo en el idioma guardado; si ya hay CV, su CV.
  $markdown.set(localStorage.getItem(STORAGE_KEY) ?? examples[readLang()]);
  $markdown.subscribe((md) => {
    if (md) localStorage.setItem(STORAGE_KEY, md);
  });
}

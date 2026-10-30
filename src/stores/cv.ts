import { atom, computed } from 'nanostores';
import { markdownToCv } from '../lib/cv';
import { examples } from '../data/examples';
import { $lang } from '../i18n/lang';

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
	// Primer arranque: el ejemplo en el idioma de la página; si ya hay CV, su CV.
	// (`cv-web:lang` ya no se escribe: el idioma lo decide la URL, Ronda 13. La
	//  clave vieja se respeta y no se borra, es preferencia del usuario.)
	$markdown.set(localStorage.getItem(STORAGE_KEY) ?? examples[$lang.get()]);
	$markdown.subscribe((md) => {
		if (md) localStorage.setItem(STORAGE_KEY, md);
	});
}

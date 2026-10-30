import { useStore } from '@nanostores/react';
import { $lang } from './lang';
import { dict, type DictKey, type Lang } from './dict';

/**
 * Hooks de React para el i18n. Están aparte de `lang.ts` para que el script
 * de Layout.astro (no React) no arrastre React a su bundle.
 */

/** Idioma de la página (el de la URL, fijado en el build). */
export function useLang(): Lang {
	return useStore($lang);
}

/** Traductor tipado: `t('tb.pdf')` compila; `t('tb.noexiste')`, no. */
export function useT(): (key: DictKey) => string {
	const lang = useStore($lang);
	return (key) => dict[key][lang];
}

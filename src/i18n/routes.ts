import { type Lang } from './dict';

/**
 * Rutas por idioma (Ronda 13). El español vive en la raíz del sitio y el
 * inglés bajo `/en/`: cada página se renderiza DOS veces, una por idioma.
 *
 * El idioma viaja en **props**, no en `Astro.params`: Astro 5.18.2 extrae el
 * frontmatter a nivel de módulo cuando exporta `getStaticPaths`, y ahí
 * `Astro.params` aún es `undefined` (rompía el build con
 * «Cannot read properties of undefined»). Con props el frontmatter se queda
 * dentro del render y todo llega correcto.
 *
 * **Es una fábrica, no una constante-array (Ronda 14):** Astro muta el array
 * que devuelve `getStaticPaths` para adjuntarle su mapa de claves
 * (`staticPaths.keyed`), y ESAS claves dependen de la ruta que las genera
 * (`/credits` vs `/ai`, vía `route.generate`). Si las 6 páginas compartieran
 * el mismo array (singleton del módulo), la última en construir sus claves
 * **pisaría** el mapa de las demás → 404 intermitentes en `astro dev`
 * («no matching static path» sin motivo aparente). Devolviendo un array nuevo
 * en cada llamada, cada ruta guarda su propio mapa.
 *
 * Uso en la página:
 *   export const getStaticPaths = () => staticLangPaths();
 *   interface Props { lang: Lang }
 *   const { lang } = Astro.props;
 */
export function staticLangPaths(): {
	params: { lang: 'en' | undefined };
	props: { lang: Lang };
}[] {
	return [
		{ params: { lang: undefined }, props: { lang: 'es' } }, // ES → /editor/
		{ params: { lang: 'en' }, props: { lang: 'en' } }, //     EN → /en/editor/
	];
}

const base = import.meta.env.BASE_URL.replace(/\/+$/, '');

/** Enlace a una página del sitio en un idioma concreto. */
export function pageHref(lang: Lang, path: string): string {
	return lang === 'en' ? `${base}/en${path}` : `${base}${path}`;
}

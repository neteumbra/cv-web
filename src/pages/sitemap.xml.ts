import type { APIRoute } from 'astro';

/**
 * Sitemap estático (Ronda 13): 6 páginas × 2 idiomas, cada una con sus
 * `xhtml:link` de hreflang. Es un endpoint de Astro, no una dependencia:
 * no hay `@astrojs/sitemap` que mantener (regla 7 de AGENTS.md).
 */

/** Páginas del sitio, relativas al `base`, en su orden de la navegación. */
const PAGES = ['', 'editor/', 'ai/', 'docs/', 'credits/', 'privacy/'];

export const GET: APIRoute = ({ site }) => {
	const origin = (site ?? new URL('https://neteumbra.github.io')).origin;
	const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
	const abs = (p: string) => `${origin}${p}`;

	const urls = PAGES.flatMap((page) => {
		const es = abs(`${base}/${page}`);
		const en = abs(`${base}/en/${page}`);
		return [es, en].map(
			(loc) => `  <url>
    <loc>${loc}</loc>
    <xhtml:link rel="alternate" hreflang="es" href="${es}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${en}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${es}"/>
  </url>`,
		);
	});

	const body = [
		'<?xml version="1.0" encoding="UTF-8"?>',
		'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
		'        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
		...urls,
		'</urlset>',
		'',
	].join('\n');

	return new Response(body, {
		headers: { 'Content-Type': 'application/xml; charset=utf-8' },
	});
};

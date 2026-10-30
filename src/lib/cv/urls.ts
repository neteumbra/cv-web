/**
 * Normalización de URLs del CV (contacto y enlaces del cuerpo).
 */

/** Quita el esquema duplicado: "https://https://x" -> "https://x". */
function stripDuplicateScheme(url: string): string {
	let out = url;
	// Sólo si el valor vuelve a empezar por esquema ("https://www.x" es válido y
	// no se toca). Se repite por si viniera duplicado más de una vez.
	while (/^https?:\/\/(?:https?:\/\/)/i.test(out)) {
		out = out.replace(/^https?:\/\//i, '');
	}
	return out;
}

/**
 * Valor mostrado en el PDF: conserva lo que escribió el usuario pero sin el
 * esquema duplicado ("https://https://github.com/x" se ve "https://github.com/x").
 */
export function tidyUrl(url: string): string {
	return stripDuplicateScheme((url ?? '').trim());
}

/** Añade el esquema si falta y lo corrige si está duplicado. */
export function normalizeUrl(url: string): string {
	const trimmed = stripDuplicateScheme((url ?? '').trim());
	if (!trimmed) return '';
	if (/^(https?:|mailto:|tel:|ftp:)/i.test(trimmed)) return trimmed;
	if (/^[\w.-]+@[\w.-]+\.\w+$/.test(trimmed)) return `mailto:${trimmed}`;
	return `https://${trimmed}`;
}

/** ¿El valor parece una URL/correo enlazable? */
export function looksLikeUrl(value: string): boolean {
	const v = (value ?? '').trim();
	if (!v) return false;
	if (/^(https?:\/\/|www\.)/i.test(v)) return true;
	if (/^[\w.-]+\.[a-z]{2,}(\/|$)/i.test(v)) return true;
	return /^[\w.-]+@[\w.-]+\.\w+$/.test(v);
}

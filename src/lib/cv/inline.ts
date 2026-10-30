/**
 * Tokenizador de sintaxis en línea del CV: enlaces, negrita y cursiva.
 *
 * Derivado de: xthecapx/cv-generator — extiende el parseo de enlaces que
 * `Section.tsx` hacía en línea.
 * Copyright (c) xthecapx — Licensed under GPL-3.0 (ver /LICENSE)
 *
 * Módulo puro (sin React ni react-pdf) para poder testearlo con Node.
 * Se aplica a los detalles y párrafos del PDF; en los títulos `##`, `###` y
 * `####` la sintaxis se pinta literal (allí el peso ya lo pone la cabecera).
 */

export type InlineToken =
	| { kind: 'link'; text: string; href: string }
	| { kind: 'bold'; text: string }
	| { kind: 'italic'; text: string }
	| { kind: 'text'; text: string };

const MARKDOWN_LINK = /^\[([^\]]+)\]\(([^)]+)\)$/;

/**
 * En orden: enlace, **negrita**, *cursiva* y _cursiva_. La negrita va antes
 * que la cursiva para que `**x**` no se coma un asterisco suelto.
 * Los pares sin cerrar se quedan como texto (nada de «efectos raros»).
 */
const INLINE = /\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*|_[^_]+_/g;

/** ¿Hay una palabra justo antes de esta posición? (para no italicizar `mi_archivo`) */
const gluedToWord = (text: string, index: number): boolean =>
	index > 0 && /[\w]/.test(text[index - 1]);

export function tokenizeInline(text: string): InlineToken[] {
	const tokens: InlineToken[] = [];
	let cursor = 0;
	let match: RegExpExecArray | null;

	INLINE.lastIndex = 0;
	while ((match = INLINE.exec(text)) !== null) {
		const raw = match[0];
		const start = match.index;

		// `_x_` pegado a una palabra es un identificador (snake_case), no cursiva.
		if (raw.startsWith('_') && gluedToWord(text, start)) continue;

		if (start > cursor)
			tokens.push({ kind: 'text', text: text.slice(cursor, start) });

		const link = raw.match(MARKDOWN_LINK);
		if (link) {
			tokens.push({ kind: 'link', text: link[1], href: link[2] });
		} else if (raw.startsWith('**')) {
			tokens.push({ kind: 'bold', text: raw.slice(2, -2) });
		} else {
			tokens.push({ kind: 'italic', text: raw.slice(1, -1) });
		}
		cursor = start + raw.length;
	}

	if (cursor < text.length)
		tokens.push({ kind: 'text', text: text.slice(cursor) });
	return tokens;
}

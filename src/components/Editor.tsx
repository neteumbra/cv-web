import { useEffect, useRef } from 'react';
import { EditorView, lineNumbers, highlightActiveLine } from '@codemirror/view';
import { EditorState, Prec } from '@codemirror/state';
import { markdown } from '@codemirror/lang-markdown';
import { oneDark } from '@codemirror/theme-one-dark';
import { $markdown } from '../stores/cv';
let debounce: number | undefined;

/** Theme propio alineado con la paleta de la app (tiene prioridad sobre oneDark). */
const appTheme = Prec.high(
	EditorView.theme({
		'&': {
			height: '100%',
			backgroundColor: 'var(--bg)',
			color: 'var(--text)',
			fontSize: '13.5px',
		},
		'.cm-scroller': { fontFamily: 'var(--mono)', lineHeight: '1.6' },
		'.cm-content': { padding: '14px 0', caretColor: 'var(--accent-2)' },
		'.cm-gutters': {
			backgroundColor: 'var(--bg)',
			color: 'var(--muted)',
			border: 'none',
			borderRight: '1px solid var(--border-soft)',
			minWidth: '44px',
		},
		'.cm-lineNumbers .cm-gutterElement': { padding: '0 10px 0 12px' },
		'.cm-activeLineGutter': {
			backgroundColor: 'transparent',
			color: 'var(--text-2)',
		},
		'.cm-activeLine': { backgroundColor: 'rgba(110, 118, 129, 0.08)' },
		'&.cm-focused': { outline: 'none' },
		'.cm-cursor, .cm-dropCursor': {
			borderLeftColor: 'var(--accent-2)',
			borderLeftWidth: '2px',
		},
		'&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
			{
				backgroundColor: 'rgba(56, 139, 253, 0.28)',
			},
		'.cm-selectionMatch': { backgroundColor: 'rgba(63, 185, 80, 0.22)' },
		'.cm-matchingBracket, &.cm-focused .cm-matchingBracket': {
			backgroundColor: 'rgba(63, 185, 80, 0.18)',
			outline: '1px solid rgba(63, 185, 80, 0.4)',
		},
		'.cm-tooltip': {
			backgroundColor: 'var(--panel-2)',
			border: '1px solid var(--border)',
			borderRadius: '6px',
			boxShadow: 'var(--shadow)',
		},
		'.cm-panels': { backgroundColor: 'var(--panel)', color: 'var(--text)' },
	}),
);

/**
 * Isla editor markdown (CodeMirror 6).
 * - Escribe en $markdown con debounce al teclear.
 * - Se sincroniza desde $markdown cuando cambia por fuera (Reset / Importar).
 */
export default function Editor() {
	const host = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!host.current) return;

		const view = new EditorView({
			parent: host.current,
			state: EditorState.create({
				doc: $markdown.get(),
				extensions: [
					lineNumbers(),
					highlightActiveLine(),
					EditorView.lineWrapping,
					markdown(),
					oneDark,
					appTheme,
					EditorView.updateListener.of((u) => {
						if (u.docChanged) {
							window.clearTimeout(debounce);
							debounce = window.setTimeout(() => {
								$markdown.set(u.state.doc.toString());
							}, 400);
						}
					}),
				],
			}),
		});

		// Cambios externos -> editor (sin bucle: sólo si difiere del documento actual).
		const unsub = $markdown.subscribe((md) => {
			const current = view.state.doc.toString();
			if (md !== current) {
				view.dispatch({
					changes: { from: 0, to: current.length, insert: md },
				});
			}
		});

		return () => {
			unsub();
			view.destroy();
		};
	}, []);

	return (
		<div
			ref={host}
			style={{ width: '100%', height: '100%', overflow: 'auto' }}
		/>
	);
}

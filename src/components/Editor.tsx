import { useEffect, useRef } from 'react';
import { EditorView, lineNumbers, highlightActiveLine } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { markdown } from '@codemirror/lang-markdown';
import { oneDark } from '@codemirror/theme-one-dark';
import { $markdown } from '../stores/cv';

let debounce: number | undefined;

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
          markdown(),
          oneDark,
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
        view.dispatch({ changes: { from: 0, to: current.length, insert: md } });
      }
    });

    return () => {
      unsub();
      view.destroy();
    };
  }, []);

  return <div ref={host} style={{ width: '100%', height: '100%', overflow: 'auto' }} />;
}

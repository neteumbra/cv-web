import { CV_TOAST, emitToast } from './events';

/**
 * Feedback global sin `alert`/`confirm`: el toast vive en Layout.astro
 * (#toast) y se activa con el evento `cv-toast`.
 *
 * `toast()` se puede importar desde cualquier isla React o <script> de una
 * página Astro (ambos se empaquetan con Vite, así que no hace falta el
 * viejo truco de `window.cvToast`).
 */
export function toast(text: string, tone: 'ok' | 'error' = 'ok'): void {
	emitToast({ text, tone });
}

/**
 * Arranca el listener del evento y el temporizador de ocultación.
 * Se llama una sola vez desde el script de Layout.astro.
 */
export function initToasts(): void {
	const toastEl = document.getElementById('toast');
	if (!toastEl) return;
	let timer: number | undefined;

	const show = (text: string, tone: 'ok' | 'error' = 'ok') => {
		if (!text) return;
		toastEl.textContent = text;
		toastEl.dataset.tone = tone;
		toastEl.classList.add('is-visible');
		window.clearTimeout(timer);
		timer = window.setTimeout(
			() => toastEl.classList.remove('is-visible'),
			2600,
		);
	};

	window.addEventListener(CV_TOAST, (e) => {
		const detail = (e as CustomEvent<{ text?: string; tone?: string }>)
			.detail;
		show(detail?.text ?? '', detail?.tone === 'error' ? 'error' : 'ok');
	});
}

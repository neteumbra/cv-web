import {
	useCallback,
	useEffect,
	useRef,
	useState,
	type CSSProperties,
	type KeyboardEvent as ReactKeyboardEvent,
	type PointerEvent as ReactPointerEvent,
} from 'react';
import Editor from './Editor';
import PdfPreview from './PdfPreview';
import { useT } from '../i18n/react';

const KEY = 'cv-web:split';
const MIN = 25;
const MAX = 75;

/**
 * Isla de trabajo: split arrastrable markdown | PDF.
 * - El ancho del panel izquierdo se persiste en localStorage.
 * - En pantallas <=800px el split se sustituye por pestañas Markdown / PDF.
 */
export default function Workspace() {
	const wrap = useRef<HTMLDivElement>(null);
	const draggingRef = useRef(false);
	const [pct, setPct] = useState(50);
	const [dragging, setDragging] = useState(false);
	const [pane, setPane] = useState<'md' | 'pdf'>('md');

	useEffect(() => {
		const saved = Number(localStorage.getItem(KEY));
		if (Number.isFinite(saved) && saved >= MIN && saved <= MAX)
			setPct(saved);
	}, []);

	const commit = useCallback((value: number) => {
		const next = Math.min(MAX, Math.max(MIN, value));
		setPct(next);
		localStorage.setItem(KEY, String(Math.round(next * 10) / 10));
	}, []);

	const moveFrom = useCallback(
		(clientX: number) => {
			const el = wrap.current;
			if (!el) return;
			const rect = el.getBoundingClientRect();
			if (rect.width <= 0) return;
			commit(((clientX - rect.left) / rect.width) * 100);
		},
		[commit],
	);

	const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.currentTarget.setPointerCapture(e.pointerId);
		e.currentTarget.focus();
		draggingRef.current = true;
		setDragging(true);
	};

	const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
		if (draggingRef.current) moveFrom(e.clientX);
	};

	const endDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
		if (!draggingRef.current) return;
		draggingRef.current = false;
		setDragging(false);
		if (e.currentTarget.hasPointerCapture(e.pointerId)) {
			e.currentTarget.releasePointerCapture(e.pointerId);
		}
	};

	const onKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
		const step = e.shiftKey ? 10 : 2;
		if (e.key === 'ArrowLeft') {
			e.preventDefault();
			commit(pct - step);
		} else if (e.key === 'ArrowRight') {
			e.preventDefault();
			commit(pct + step);
		} else if (e.key === 'Home') {
			e.preventDefault();
			commit(MIN);
		} else if (e.key === 'End') {
			e.preventDefault();
			commit(MAX);
		}
	};

	const t = useT();
	const style = { '--split': `${pct}%` } as CSSProperties;

	return (
		<div className="workspace" ref={wrap} style={style}>
			<div className="wtabs" role="group" aria-label={t('ws.tabs')}>
				<button
					type="button"
					aria-pressed={pane === 'md'}
					aria-controls="pane-md"
					onClick={() => setPane('md')}
				>
					{t('ws.tab.md')}
				</button>
				<button
					type="button"
					aria-pressed={pane === 'pdf'}
					aria-controls="pane-pdf"
					onClick={() => setPane('pdf')}
				>
					{t('ws.tab.pdf')}
				</button>
			</div>

			<div
				id="pane-md"
				className={`pane pane-md${pane === 'md' ? ' is-active' : ''}`}
				aria-label={t('ws.tab.md')}
			>
				<Editor />
			</div>

			<div
				className={`divider${dragging ? ' is-dragging' : ''}`}
				role="separator"
				aria-orientation="vertical"
				aria-label={t('ws.resize')}
				aria-valuenow={Math.round(pct)}
				aria-valuemin={MIN}
				aria-valuemax={MAX}
				tabIndex={0}
				onPointerDown={onPointerDown}
				onPointerMove={onPointerMove}
				onPointerUp={endDrag}
				onPointerCancel={endDrag}
				onKeyDown={onKeyDown}
			/>

			<div
				id="pane-pdf"
				className={`pane pane-pdf${pane === 'pdf' ? ' is-active' : ''}`}
				aria-label={t('ws.tab.pdf')}
			>
				<PdfPreview />
			</div>
		</div>
	);
}

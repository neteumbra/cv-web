import type { Lang } from '../i18n/dict';
import es from './default.md?raw';
import en from './default.en.md?raw';

/**
 * Ejemplo de CV por idioma: es lo que carga el primer arranque (sin nada
 * guardado) y lo que restaura «↺ Reiniciar». Ambos ejemplos tienen la misma
 * estructura para que el parser y `cvToMarkdown` se comporten igual.
 *
 * El idioma vigente se lee con `readLang()` de `src/i18n/lang.ts` (una sola
 * fuente de verdad para toda la app).
 */
export const examples: Record<Lang, string> = { es, en };

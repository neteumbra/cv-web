import { dict, type DictKey, type Lang } from './dict';

/**
 * Texto de una clave para el idioma de la página que se está renderizando.
 *
 * El idioma ya no es un estado de cliente: lo decide la **ruta** (ES en la
 * raíz, EN bajo `/en/`) y este `t()` se ejecuta en el build. Cada página le
 * pasa su `lang` al Layout y a sus componentes; no hay `data-i18n` que
 * reescribir en el navegador.
 */
export function t(key: DictKey, lang: Lang): string {
  return dict[key][lang];
}

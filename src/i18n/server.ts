import { dict, type DictKey } from './dict';

/**
 * Texto por defecto (ES) de una clave, para renderizarlo dentro de los `.astro`.
 *
 * El HTML del build sale así de la MISMA fuente que el i18n en cliente
 * (`dict.ts`): no hay texto duplicado que el JS pisa al arrancar y cualquier
 * cambio de copy se hace en un solo sitio. `data-i18n` sigue presente para que
 * `apply()` pueda cambiar el idioma en caliente.
 */
export function t(key: DictKey): string {
  return dict[key].es;
}

# AGENTS.md

Guía para agentes de código que trabajen en **cv-web**. Lee esto antes de tocar nada y mantén
[`PROGRESS.md`](PROGRESS.md) actualizado al cerrar cada ronda.

## Qué es

Editor de CV en **Markdown** que muestra el PDF renderizándose en vivo, en paralelo.
Todo ocurre en el navegador: no hay servidor, ni base de datos, ni cuentas. El markdown que
escribes se guarda en `localStorage` y el PDF se genera con `@react-pdf/renderer` en el cliente.

- **Licencia:** GPL-3.0 (`LICENSE`).
- **Crédito obligatorio:** el motor de CV (parser markdown y render PDF) deriva de
  [xthecapx/cv-generator](https://github.com/xthecapx/cv-generator). No borrar la mención en
  `src/lib/cv/*` ni en `/credits`.
- **Sitio:** <https://neteumbra.github.io/cv-web> (GitHub Pages, `base: '/cv-web'`).

## Stack

| Capa | Tecnología |
| --- | --- |
| Framework | Astro 5 (estático) + islas React con `client:only` |
| Estado | nanostores (`$markdown` → `$cvData` computado) |
| Editor | CodeMirror 6 (`@codemirror/lang-markdown`, tema propio) |
| PDF | `@react-pdf/renderer` (worker en el navegador) |
| YAML | `yaml` (frontmatter opcional del CV) |
| i18n | propio, en `src/i18n/dict.ts` (ES/EN). **El idioma lo decide la ruta**: ES en la raíz, EN bajo `/en/` |
| SEO | canónica + `hreflang` por página, OG/Twitter con imagen propia, JSON-LD, `robots.txt`, `sitemap.xml` |
| CSS | puro, variables del tema; sin frameworks ni preprocesadores |

## Comandos

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Dev server → `http://localhost:4322/cv-web/` (el 4321 puede ser otra instancia) |
| `npm run build` | Build estático en `dist/`; deben salir **12 páginas** (6 × 2 idiomas): `/`, `/editor`, `/ai`, `/docs`, `/credits`, `/privacy` **y** sus gemelas `/en/…`, más `/404.html` y `/sitemap.xml` |
| `npm run preview` | Sirve `dist/` |

## Estructura

```
src/
  pages/
    [...lang]/     las 6 páginas, renderizadas DOS veces (ES en la raíz, EN en /en/)
    404.astro      página de error (noindex; GH Pages la sirve para URL rota)
    sitemap.xml.ts endpoint estático: 12 URLs con sus alternates hreflang
  layouts/        Layout.astro — idioma, metadatos SEO, CSS global, navbar, footer, toasts
  components/     Navbar.astro, Footer.astro, DonateButton.astro (server) ·
                  Toolbar, Editor, PdfPreview, Workspace, ResetDialog (React)
  stores/cv.ts    $markdown (fuente de verdad) + $cvData (derivado)
  lib/
    cv/           cvConverter (parser), types, CvDocument/Section (render PDF), urls
    pdf.ts        slugify, downloadBlob, downloadPdf
    events.ts     evento cv-toast (el de idioma ya no existe)
  i18n/
    dict.ts       todas las cadenas ES/EN
    server.ts     t(clave, lang) para los .astro
    lang.ts       $lang de React (lee <html lang> de la ruta)
    routes.ts     STATIC_LANG_PATHS (getStaticPaths) + pageHref(lang, ruta)
  data/default.md ejemplo por defecto ES (default.en.md, el EN)
public/
  img/og.png, og.en.png   imagen social 1200×630 por idioma
  img/kofi-symbol.svg     símbolo oficial de Ko-fi (asset local)
  robots.txt
docs/
  formato-cv.md       Fuente única del formato, en español
  formato-cv.en.md    Misma fuente, en inglés
```

## Reglas generales

1. **Cero `alert()`, `confirm()` y `prompt()` nativos.** El feedback es un toast (evento
   `cv-toast`, helper `toast()`), el estado del propio control, o un `<dialog>` propio.
2. **i18n:** toda cadena visible va en `src/i18n/dict.ts` con clave `es` y `en`, y se escribe
   con `t(clave, lang)`. **Ya no hay `data-i18n` ni traducción en cliente**: el idioma lo
   decide la ruta, así que el HTML sale traducido del build. Para añadir una página: mueve la
   ruta a `src/pages/[...lang]/`, exporta `getStaticPaths = () => STATIC_LANG_PATHS`,
   declara `interface Props { lang: Lang }` y lee `Astro.props` (**no** `Astro.params`:
   el compilador de Astro 5.18 extrae el frontmatter a top-level y ahí params es `undefined`).
3. **Fuente única del formato:** `docs/formato-cv.md` y `docs/formato-cv.en.md`. Si cambia el
   parser, se actualizan **ambos** ficheros y el prompt de `/ai` (ES y EN). `/docs` los renderiza.
4. **CSS:** sólo variables del tema (`--bg`, `--panel*`, `--border*`, `--text*`, `--muted`,
   `--accent*`, `--radius*`, `--shadow`, `--mono`, `--font`). Los literales de color sólo se
   admiten dentro del render del PDF (`src/lib/cv/*.tsx`), que no usa CSS.
5. **Privacidad:** sin telemetría, sin analíticas, sin cookies de terceros, sin fetch a
   servicios externos en runtime. Los enlaces externos son sólo enlaces (`target=_blank` +
   `rel=noopener`).
6. **No tocar el `localStorage` del usuario:** `cv-web:markdown` es **su CV real** y
   `cv-web:split` una preferencia. `cv-web:lang` ya no se escribe (el idioma lo decide la
   URL desde la Ronda 13), pero la clave vieja **se respeta y no se borra**: sigue siendo
   preferencia del usuario. Al probar, haz copia antes de sobrescribir y restáurala.
7. **Sin dependencias nuevas** sin consultarlo antes. (El sitemap es un endpoint de Astro,
   no `@astrojs/sitemap`, precisamente por esto.)
8. **Verificación obligatoria** al cerrar ronda: `npm run check` + `npm run build` (12 páginas)
   + capturas de las 12 rutas en **ES y EN**, desktop y móvil (≤700px), con **0 errores de
   consola**. Si no hay MCP de navegador, sirve `dist/` y usa chromium headless por CDP
   (script de referencia en la Ronda 13 de `PROGRESS.md`). Las descargas del navegador de
   pruebas van a su carpeta de trabajo (`.playwright-mcp/`, `/tmp`…), nunca a `~/Downloads`:
   no es un bug de la app.
9. **Idioma:** comunicación y comentarios en español; identificadores en inglés.
10. **Skills locales** en `.opencode/skills/` (gitignored, se descargan de sus repos oficiales):
    - `frontend-design` — dirección estética, anti-"AI slop". Úsala **antes** de diseñar o rediseñar UI.
    - `web-design-guidelines` — auditoría de accesibilidad/UX de Vercel. Úsala para **revisar** UI ya escrita.

    Si no existen en tu máquina, sigue igualmente estas reglas; no son requisito para trabajar.
11. **Commits:** en esta tanda hay un **único commit al final** (Ronda 10 de `PROGRESS.md`).
    Hasta entonces se trabaja sobre el working tree y el progreso se registra en `PROGRESS.md`.

## Estado del proyecto

Ver [`PROGRESS.md`](PROGRESS.md): rondas, qué está hecho, qué falta y qué está bloqueado.

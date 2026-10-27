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
| i18n | propio, en `src/i18n/dict.ts` (ES/EN) |
| CSS | puro, variables del tema; sin frameworks ni preprocesadores |

## Comandos

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Dev server → `http://localhost:4322/cv-web/` (el 4321 puede ser otra instancia) |
| `npm run build` | Build estático en `dist/`; deben salir **6 páginas**: `/`, `/editor`, `/ai`, `/docs`, `/credits`, `/privacy` |
| `npm run preview` | Sirve `dist/` |

## Estructura

```
src/
  pages/          index (landing), editor, ai, docs, credits, privacy
  layouts/        Layout.astro — i18n, CSS global, navbar, footer, toasts, modal
  components/     Navbar.astro, Footer.astro (server) · Toolbar, Editor, PdfPreview, Workspace (React)
  stores/cv.ts    $markdown (fuente de verdad) + $cvData (derivado)
  lib/
    cv/           cvConverter (parser), types, CvDocument/Section (render PDF), urls
    pdf.ts        slugify, downloadBlob, downloadPdf
  i18n/dict.ts    todas las cadenas ES/EN
  data/default.md ejemplo por defecto (se carga si no hay nada guardado)
docs/
  formato-cv.md       Fuente única del formato, en español
  formato-cv.en.md    Misma fuente, en inglés
```

## Reglas generales

1. **Cero `alert()`, `confirm()` y `prompt()` nativos.** El feedback es un toast (evento
   `cv-toast`, helper `toast()`), el estado del propio control, o un `<dialog>` propio.
2. **i18n:** toda cadena visible va en `src/i18n/dict.ts` con clave `es` y `en`. Nada de texto
   hardcodeado en componentes. Los `<html data-i18n>` usan `textContent`, así que **sin markup
   dentro** de los traducidos.
3. **Fuente única del formato:** `docs/formato-cv.md` y `docs/formato-cv.en.md`. Si cambia el
   parser, se actualizan **ambos** ficheros y el prompt de `/ai` (ES y EN). `/docs` los renderiza.
4. **CSS:** sólo variables del tema (`--bg`, `--panel*`, `--border*`, `--text*`, `--muted`,
   `--accent*`, `--radius*`, `--shadow`, `--mono`, `--font`). Los literales de color sólo se
   admiten dentro del render del PDF (`src/lib/cv/*.tsx`), que no usa CSS.
5. **Privacidad:** sin telemetría, sin analíticas, sin cookies de terceros, sin fetch a
   servicios externos en runtime. Los enlaces externos son sólo enlaces (`target=_blank` +
   `rel=noopener`).
6. **No tocar el `localStorage` del usuario:** `cv-web:markdown` es **su CV real**; `cv-web:lang`
   y `cv-web:split` son preferencias. Al probar, haz copia antes de sobrescribir y restáurala.
7. **Sin dependencias nuevas** sin consultarlo antes.
8. **Verificación obligatoria** al cerrar ronda: `npm run build` + Playwright en **ES y EN**,
   desktop y móvil (≤700px). El navegador del Playwright MCP guarda las descargas en
   `.playwright-mcp/` (nunca en `~/Downloads`): no es un bug de la app.
9. **Idioma:** comunicación y comentarios en español; identificadores en inglés.
10. **Skills locales** en `.opencode/skills/` (gitignored, se descargan de sus repos oficiales):
    - `frontend-design` — dirección estética, anti-"AI slop". Úsala **antes** de diseñar o rediseñar UI.
    - `web-design-guidelines` — auditoría de accesibilidad/UX de Vercel. Úsala para **revisar** UI ya escrita.

    Si no existen en tu máquina, sigue igualmente estas reglas; no son requisito para trabajar.
11. **Commits:** en esta tanda hay un **único commit al final** (Ronda 10 de `PROGRESS.md`).
    Hasta entonces se trabaja sobre el working tree y el progreso se registra en `PROGRESS.md`.

## Estado del proyecto

Ver [`PROGRESS.md`](PROGRESS.md): rondas, qué está hecho, qué falta y qué está bloqueado.

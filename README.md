# cv-web

<div align="center">

![Astro](https://img.shields.io/badge/Astro-5-1F2937?style=for-the-badge&logo=astro&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-1F2937?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-19-1F2937?style=for-the-badge&logo=react&logoColor=white)
![CodeMirror](https://img.shields.io/badge/CodeMirror-6-007396?style=for-the-badge&logo=codemirror&logoColor=white)
![PDF](https://img.shields.io/badge/PDF-Export-007396?style=for-the-badge&logo=adobeacrobatreader&logoColor=white)
![i18n](https://img.shields.io/badge/i18n-ES%20%2F%20EN-1F2937?style=for-the-badge)
![License](https://img.shields.io/badge/License-GPL--3.0-1F2937?style=for-the-badge&logo=gnu&logoColor=white)

</div>

A **Markdown CV editor with live PDF preview** (WYSIWYG). 100% in the browser:
no servers, no database, **no data ever leaves your machine**.

**100% open source under GPL-3.0.** Interface available in **Spanish and
English**.

## Features

- Markdown editor (CodeMirror 6) on the left
- Real PDF preview on the right (updates as you type)
- **Draggable split** (25–75 %, persisted) and Markdown/PDF tabs on small
  screens
- Instant PDF download (generated in the browser with `@react-pdf/renderer`)
- **⌘ Autoformatear**: normalizes the Markdown without losing content (ES
  labels, plain paragraphs, unknown contact keys)
- Contact links (`LinkedIn`, `GitHub`, `Portafolio`, `Web`…) render as real
  hyperlinks in the PDF
- Import / export `.md`
- Automatic saving to `localStorage`
- ES / EN toggle in the top bar (works on every page)
- **AI instructions**: a prompt that explains what to paste and what you will
  get back, plus a complete example CV
- **No native dialogs**: every action gives feedback via toast or inline state
- Donations via [Ko-fi](https://ko-fi.com/neteumbra) (modal in the footer)
- Privacy page: everything is local, no cookies and no trackers

## Pages

- `/` — Home: one screen — what it is + call to action
- `/editor` — The markdown editor + PDF preview
- `/docs` — Format specification in ES/EN (rendered from
  [`docs/formato-cv.md`](docs/formato-cv.md) and
  [`docs/formato-cv.en.md`](docs/formato-cv.en.md), following the selected
  language)
- `/ai` — AI instructions (copyable prompt with a complete example CV)
- `/credits` — Credits (this project and the original one)
- `/privacy` — Privacy: why nothing leaves your browser

## CV Format

The single source of truth lives in [`docs/formato-cv.md`](docs/formato-cv.md)
(Spanish) and [`docs/formato-cv.en.md`](docs/formato-cv.en.md) (English), both
visible on GitHub and rendered on `/docs`.

```markdown
# Nombre
- title: Título
- Phone: +34 600 000 000
- Email: correo@ejemplo.com
- Ubicación: Ciudad, País
- LinkedIn: linkedin.com/in/tu-usuario
- Portafolio: tudominio.dev

## SECCIÓN
Un párrafo justo tras el ## se muestra sin viñeta (resumen).

### Empresa | Ubicación
#### Rol | 2020 - Presente
- Logro 1
- Logro 2
```

- Contact fields accept **both Spanish and English** (`Phone`/`Teléfono`,
  `Email`/`Correo`, `Location`/`Ubicación`/`Ciudad`); unknown keys are kept
  as-is.
- `\break` after a `##` or `###` forces a page break.
- Links like `[text](url)` work inside any detail.

Full example: [`src/data/default.md`](src/data/default.md).

## Development

```bash
npm install
npm run dev      # http://localhost:4321/cv-web
npm run build    # builds dist/
npm run preview
```

## Deployment (GitHub Pages)

The workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
builds and publishes on every push to `main`. In the repo: **Settings -> Pages
-> Source: GitHub Actions**.

URL: `https://<username>.github.io/cv-web` (adjust `site` and `base` in
[`astro.config.mjs`](astro.config.mjs) if you rename the repo).

## License

**GPL-3.0** (see [LICENSE](LICENSE)) — free software.

The CV engine (`src/lib/cv/`) is derived from
**[xthecapx/cv-generator](https://github.com/xthecapx/cv-generator)** (GPL-3.0),
created by **[(xthecapx)](https://github.com/xthecapx)**. All original credit is
theirs.

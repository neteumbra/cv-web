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

A **Markdown CV editor with live PDF preview** (WYSIWYG). 100% in the browser: no servers, no database, **no data ever leaves your machine**.

**100% open source under GPL-3.0.** Interface available in **Spanish and English**.

## Features

- Markdown editor (CodeMirror 6) on the left
- Real PDF preview on the right (updates as you type)
- Instant PDF download (generated in the browser with `@react-pdf/renderer`)
- Automatic saving to `localStorage`
- Import / export `.md`
- ES / EN toggle in the top bar
- **AI instructions**: a prompt to convert an old CV into this format

## Pages

- `/` — Home: what it is, why and how to use it (+ donations)
- `/editor` — The markdown editor + PDF preview
- `/ai` — AI instructions (copyable prompt)
- `/credits` — Credits to the original author

## CV Format

```markdown
# Nombre
- title: Título
- Phone: +34 600 000 000
- Email: correo@ejemplo.com
- Ubicación: Ciudad, País
- LinkedIn: linkedin.com/in/tu-usuario

## SECCIÓN
Un párrafo justo tras el ## se muestra sin viñeta (resumen).

### Empresa | Ubicación
#### Rol | 2020 - Presente
- Logro 1
- Logro 2
```

- Contact fields accept **both Spanish and English** (`Phone`/`Teléfono`, `Email`/`Correo`, `Location`/`Ubicación`/`Ciudad`).
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
## License

**GPL-3.0** (see [LICENSE](LICENSE)) — free software.

The CV engine (`src/lib/cv/`) is derived from **[xthecapx/cv-generator](https://github.com/xthecapx/cv-generator)** (GPL-3.0), created by Cristian Daniel Márquez Barrios. All original credit is theirs.

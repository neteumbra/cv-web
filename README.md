# cv-web

Editor de CV en **Markdown** con **previsualización PDF en vivo** (WYSIWYG). 100 % en el navegador: sin servidores, sin base de datos, **ningún dato sale de tu equipo**.

- ✏️ Editor markdown (CodeMirror 6) a la izquierda
- 👀 Previsualización PDF real a la derecha (se actualiza mientras escribes)
- ⤓ Descarga de PDF al instante (generado en el navegador con `@react-pdf/renderer`)
- 💾 Guardado automático en `localStorage`
- 📥 Importar / exportar `.md`
- 🚀 Estático, desplegado en GitHub Pages

## Formato del CV

El markdown sigue el mismo formato que el proyecto original. Un ejemplo completo está en [`src/data/default.md`](src/data/default.md). Resumen:

```markdown
# Nombre
- title: Título
- Phone: +34 600 000 000
- Email: correo@ejemplo.com
- Location: Ciudad
- LinkedIn: linkedin.com/in/tu-usuario

## SECCIÓN
### Empresa | Ubicación
#### Rol | 2020 - Presente
- Logro 1
- Logro 2
```

- `\break` tras un `##` o `###` fuerza salto de página.
- Un párrafo plano justo tras un `##` se renderiza sin viñetas.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:4321/cv-web
npm run build    # genera dist/
npm run preview
```

## Despliegue (GitHub Pages)

El workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) construye y publica en cada push a `main`. En el repo de GitHub: **Settings → Pages → Source: GitHub Actions**.

La URL será `https://<usuario>.github.io/cv-web` (ajusta `site` y `base` en [`astro.config.mjs`](astro.config.mjs) si cambias el nombre del repo).

## Arquitectura

Astro con **islas React**. El estado se comparte entre islas con [nanostores](https://nanostores.github.io/):

```
$markdown (fuente de verdad, localStorage)
   └─ computed ─▶ $cvData ─▶ PdfPreview (PDFViewer)
Editor ─(debounce)─▶ $markdown
Toolbar ─▶ lee $markdown / $cvData
```

- `src/lib/cv/` — motor de parser + render PDF.
- `src/stores/cv.ts` — estado global.
- `src/components/*.tsx` — las islas.
- `src/lib/pdf.ts` — generación/descarga del PDF en el navegador.

## Licencia

GPL-3.0 (ver [LICENSE](LICENSE)).

El motor de CV (`src/lib/cv/`) es derivado de **[xthecapx/cv-generator](https://github.com/xthecapx/cv-generator)** (GPL-3.0). Agradecimiento original a su autor.

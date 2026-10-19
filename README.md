# cv-web

Editor de CV en **Markdown** con **previsualización PDF en vivo** (WYSIWYG). 100 % en el navegador: sin servidores, sin base de datos, **ningún dato sale de tu equipo**.

**100 % open source bajo GPL-3.0.** Interfaz disponible en **español e inglés**.

## Qué hace

- ✏️ Editor markdown (CodeMirror 6) a la izquierda
- 👀 Previsualización PDF real a la derecha (se actualiza mientras escribes)
- ⤓ Descarga de PDF al instante (generada en el navegador con `@react-pdf/renderer`)
- 💾 Guardado automático en `localStorage`
- 📥 Importar / exportar `.md`
- 🌐 ES / EN (toggle en la barra superior)
- 🤖 **Instrucciones para IA**: prompt para convertir un CV antiguo a este formato

## Páginas

- `/` — Inicio: qué es, por qué y cómo usarlo (+ donaciones)
- `/editor` — El editor markdown + preview PDF
- `/ai` — Instrucciones para IA (prompt copiable)
- `/credits` — Créditos al autor original

## Formato del CV

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

- Los campos de contacto aceptan **español e inglés** (`Phone`/`Teléfono`, `Email`/`Correo`, `Location`/`Ubicación`/`Ciudad`).
- `\break` tras un `##` o `###` fuerza salto de página.
- Enlaces como `[texto](url)` dentro de cualquier detalle.

Ejemplo completo: [`src/data/default.md`](src/data/default.md).

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:4321/cv-web
npm run build    # genera dist/
npm run preview
```

## Despliegue (GitHub Pages)

El workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) construye y publica en cada push a `main`. En el repo: **Settings → Pages → Source: GitHub Actions**.

URL: `https://<usuario>.github.io/cv-web` (ajusta `site` y `base` en [`astro.config.mjs`](astro.config.mjs) si cambias el nombre del repo).

## Arquitectura

Astro con **islas React**; el estado se comparte con [nanostores](https://nanostores.github.io/):

```
$markdown (fuente de verdad, localStorage)
   └─ computed ─▶ $cvData ─▶ PdfPreview (PDFViewer)
Editor ─(debounce)─▶ $markdown
Toolbar ─▶ lee $markdown / $cvData
```

- `src/lib/cv/` — motor de parser + render PDF.
- `src/stores/` — estado global (`cv`, `lang`).
- `src/i18n/` — diccionario ES/EN.
- `src/components/` — islas React + Navbar/Footer.

## Licencia

**GPL-3.0** (ver [LICENSE](LICENSE)) — software libre.

El motor de CV (`src/lib/cv/`) es derivado de **[xthecapx/cv-generator](https://github.com/xthecapx/cv-generator)** (GPL-3.0), creado por Cristian Daniel Márquez Barrios. Todo el crédito original es suyo.

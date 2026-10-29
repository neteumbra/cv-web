# PROGRESS

Registro de progreso de **cv-web**. Se actualiza **al cerrar cada ronda**: qué se hizo, qué
queda y qué está bloqueado. Lee también [`AGENTS.md`](AGENTS.md) para las reglas generales.

**Leyenda:** ✅ hecho · 🚧 en curso · ⏳ pendiente · ⛔ bloqueado

**Estado global:** tanda 1 cerrada — Rondas 1–10 en el commit `d970062`, tanda 2
(Ronda 11) en `f1ce664`. **Tanda 3 (calidad + deploy) cerrada: Rondas 12 y 13 en
el commit único de cierre de esta tanda.** Falta el **push a `main` por parte del
usuario** (el deploy lo dispara el workflow `.github/workflows/deploy.yml` sobre
ese push).

---

## Plan de rondas

| # | Ronda | Estado | Notas |
| --- | --- | --- | --- |
| 1 | Cimiento + skills de diseño | ✅ | `AGENTS.md`, `PROGRESS.md`, `.gitignore`, skills en `.opencode/skills/` (gitignored) |
| 2 | Navbar → segmented control | ✅ | `[Docs][ES][menú]`, SVG en vez de emoji, radios 6px; guiada por `frontend-design` |
| 3 | Animación del mock ("escribe → renderiza") | ✅ | spans por línea + keyframes + `prefers-reduced-motion` |
| 4 | Ejemplo bilingüe de reset | ✅ | `default.md` (ES) + `default.en.md` (EN); reset y primer arranque según idioma |
| 5 | Refactor CSS (extracción) | ✅ | 811 líneas de `Layout.astro` → `src/styles/*.css`; **cero cambios visuales** |
| 6 | Refactor JS/TS | ✅ | `$lang` store, `lib/toast.ts`, `lib/events.ts`, `dict` tipado (`DictKey`), `Toolbar`→`ResetDialog`, `npm run check` a 0 errores |
| 7 | Texto plano + listas numeradas | ✅ | Párrafo en cualquier posición, viñeta no tragada, `1. 2. 3.` con marcador propio (`CvDetail`); parser + PDF + docs + prompt |
| 8 | Negrita y cursiva | ✅ | `lib/cv/inline.ts` (tokenizador recursivo) + `DetailText` + docs §5/§6 + prompt ES/EN; fix de campos de contacto vacíos en el PDF |
| 9 | Verificación integral | ✅ | 6 páginas × ES/EN × desktop/móvil, reduced-motion, toasts, diálogo, descargas; `check` 0 + `build` 6 + 0 errores JS; fix del `\n` final |
| 10 | Donaciones + commit único | ✅ | Fuera Buy Me a Coffee (decisión del usuario): se mantiene Ko-fi con su **símbolo oficial en local** (`public/img/kofi-symbol.svg`); commit único al final |
| 11 | i18n desde dict + navbar/copy/botones | ✅ | Fin del texto muerto en HTML: todo sale de `dict.ts` (`src/i18n/server.ts`); píldora de navbar sin barra inferior; GPL sólo en `/credits`; `.btn` rediseñado (primario azul de acento) |
| 12 | Bug del botón + copy + estética | ✅ | `.prose a:not(.btn)` (el estilo de enlace le ganaba al botón de Ko-fi); componente `DonateButton.astro`; `/credits` y `/privacy` reescritos (asertivos) + FAQ numerada y JSON-LD `FAQPage` |
| 13 | SEO "CV ATS" + i18n por rutas + deploy | ✅ | ES en raíz + `/en/` (12 páginas), metadatos por página, OG image por idioma, robots/sitemap/404, copy con keyword "crear CV ATS gratis"; idioma en `Astro.props` (bug de Astro 5.18 con `Astro.params`) |

**Tarea de donaciones (petición del usuario) — RESUELTA en la Ronda 10:**

La petición original era migrar todos los enlaces a
<https://buymeacoffee.com/neteumbra> con los snippets oficiales de Buy Me a Coffee.
**El usuario la anuló**: «todo lo de Buy Me a Coffee se murió; usemos los assets de
<https://ko-fi.com/neteumbra>». Decisión tomada con el usuario:

- **Opción elegida:** *logo oficial en local*. Los 6 enlaces siguen apuntando a
  `https://ko-fi.com/neteumbra` (no se tocó ninguna URL) y los tres botones de
  donación (diálogo del footer, `/credits`, `/privacy`) llevan ahora el **símbolo
  oficial de Ko-fi** descargado del pack de marca
  (<https://storage.ko-fi.com/cdn/brandasset/v2/kofi_brandasset.zip>) a
  **`public/img/kofi-symbol.svg`** (3,2 KB).
- **Cumple la regla 5**: es un asset local; verificado con
  `performance.getEntriesByType('resource')` → **0 peticiones a terceros** y 0 a
  `ko-fi.com` (sólo al pulsar el enlace).
- `data-i18n` se movió a un `<span>` interior para que `apply()` no borre la
  etiqueta `<img>` al cambiar de idioma (verificado ES↔EN: el icono sobrevive).
- La clave `donate.kofi` **no se renombra** (sigue siendo Ko-fi); el texto tampoco.
- Descarteado: el ZIP de Ko-fi llega con reto de Cloudflare a `curl` → se bajó con
  el navegador del MCP; sólo se usa `kofi_symbol.svg`, no el resto del pack.

---

## Registro

### 2026-10-28 · Ronda 13 — SEO "CV ATS", i18n por rutas y SEO técnico ✅

**Peticiones del usuario** y decisiones tomadas:

| Petición | Decisión |
| --- | --- |
| Posicionar **"CV ATS"** (ES: «crear CV ATS»; EN: «ATS resume builder») | Copy SEO en `dict.ts`: `<title>` y `meta description` **por página** en ambos idiomas; hero del landing con la keyword; bloque nuevo «Por qué este formato le sienta bien a un ATS» (3 tarjetas: texto seleccionable, una sola columna, encabezados/fechas estándar) |
| Claim ATS **comprobable**, sin prometer compatibilidad certificada | Nota honesta en el landing: *«No certificamos compatibilidad con ningún ATS concreto: nadie puede prometer eso de forma honesta…»* — sólo se explican las decisiones de formato que sí controlamos |
| SEO técnico «esencial completo» **sin dependencias nuevas** (regla 7) | canónica + `hreflang` (es/en/x-default→ES) por página, OG + Twitter por idioma, JSON-LD (`SoftwareApplication` en el landing, `FAQPage` en `/privacy`), `robots.txt` y `sitemap.xml` como **endpoint de Astro** (no `@astrojs/sitemap`), `404.html` con `noindex` |
| Imagen OG **1200×630 generada localmente** | `public/img/og.png` (ES) y `og.en.png` (EN), hechas con chromium headless sobre un HTML temporal (script en `/tmp/opencode/gen-og.mjs`); 0 peticiones externas (regla 5) |
| Arquitectura i18n (delegada + preguntada) | **Rutas pre-renderizadas por idioma**: ES en la raíz, EN bajo `/en/` → **12 páginas**. El selector de la navbar pasa a ser **dos enlaces normales** (`[ES][EN]`, `aria-current` en el activo), no un toggle client-side: se rastrean y comparten las dos URLs reales |
| «Commit único al final y push por el usuario» (regla 11) | Un solo commit de la tanda 3 (Rondas 12+13); el usuario hace el push a `main` → el workflow `deploy.yml` publica |

**Cambios por fichero** (además de los de la Ronda 12, no commiteados aún):

| Fichero | Qué |
| --- | --- |
| `src/i18n/routes.ts` | **nuevo**: `STATIC_LANG_PATHS` (2 paths con `props.lang`) y `pageHref(lang, ruta)` |
| `src/pages/[...lang]/` | **las 6 páginas movidas con `git mv`** y renderizadas 2×; todas con `getStaticPaths = () => STATIC_LANG_PATHS` + `interface Props { lang }` |
| `src/pages/404.astro`, `src/pages/sitemap.xml.ts` | **nuevos**: 404 propio (noindex, sin canónica/alternates) y sitemap estático con las 12 URLs + `xhtml:link` hreflang |
| `src/layouts/Layout.astro` | Props `lang`/`titleKey`/`descKey`/`jsonLd`/`noindex`; canonical + hreflang + OG/Twitter + JSON-LD; `<html lang>`; fuera el i18n de cliente |
| `src/components/Navbar.astro` | selector de idioma = 2 enlaces por ruta (antes toggle + `cv-lang`); activo con `aria-current` |
| `src/components/Footer.astro`, `DonateButton.astro` | reciben `lang` por props; sin `data-i18n` |
| `src/i18n/dict.ts` | copy SEO por página (`meta.title.*`/`meta.desc.*` ES+EN), hero + bloque `landing.ats.*`, claves `meta.title.404`/`notfound.*`; fuera `nav.lang` y `meta.desc` global |
| `src/i18n/server.ts`, `lang.ts`, `react.ts` | `t(clave, lang)` explícito; `$lang` lee `<html lang>` de la ruta; fuera `readLang`/`onLang` |
| `src/lib/events.ts`, `src/lib/toast.ts` | fuera el evento `cv-lang` y `initI18n`; sólo queda `cv-toast` |
| `src/stores/cv.ts` | primer arranque con `examples[$lang.get()]` (idioma de la URL); `cv-web:lang` ya no se escribe (clave vieja respetada, no borrada — regla 6) |
| `src/pages/[...lang]/docs.astro` | renderiza **sólo** el markdown del idioma de la ruta (antes los dos en el DOM + script que ocultaba uno) |
| `src/pages/[...lang]/ai.astro` | feedback del clipboard vía `data-*` (el script no necesita el diccionario) |
| `public/robots.txt`, `public/img/og.png`, `og.en.png` | **nuevos** |
| `AGENTS.md`, `README.md` | actualizados a la nueva arquitectura (12 páginas, `Astro.props`, SEO, puerto 4322, sin «modal in the footer») |

**Hallazgos clave**

- **Bug de Astro 5.18.2**: cuando el frontmatter exporta `getStaticPaths`, el
  compilador **extrae todo el frontmatter a nivel de módulo**, y ahí
  `Astro.params` es `undefined` → «Cannot read properties of undefined (reading
  'lang')» al generar las rutas. **Solución: el idioma viaja en `props`**
  (`{ params: { lang: 'en' }, props: { lang: 'en' } }`) y la página lee
  `Astro.props`. Documentado en `routes.ts` y en la regla 2 de `AGENTS.md`.
- `getStaticPaths` tiene que ser **función** (`() => STATIC_LANG_PATHS`); pasar
  el array suelto da «mod.getStaticPaths is not a function».
- El compilador sigue rechazando **anotaciones de tipo complejas** en `const`
  del frontmatter («The constant *faq* must be initialized»): solución `as
  const`, ya usada en la Ronda 11.
- Rutas profundas → los imports relativos suben un nivel extra:
  `../../docs/formato-cv.md` fallaba desde `[...lang]/`, toca `../../../`.
- El CV **sobrevive al cambio de idioma** porque el markdown vive en
  `localStorage` (mismo origen) y ahora sólo cambia la URL: test CDP
  `/editor/` → `/en/editor/` → **8/8 TODO OK**.

**Verificación**

- `npm run check` → **0 errores / 0 warnings / 0 hints**; `npm run build` →
  **13 páginas** (12 HTML + `sitemap.xml`) + `404.html`.
- Metadatos inspeccionados en `dist/`: `<html lang>` correcto por ruta,
  canonical/hreflang/OG por idioma (`og.png` en ES, `og.en.png` en EN),
  JSON-LD válido, sitemap con **12 URLs** y sus 3 alternates, robots.txt con
  el sitemap.
- Capturas CDP (chromium headless, 0 `Runtime.exceptionThrown`): **12 rutas**
  (ES y EN) + `404.html`, desktop 1280 y móvil 390 (landing y varias páginas);
  el PDF del editor renderiza con el CV de ejemplo en su idioma (espera de
  3,2 s en el script).
- Selector de idioma comprobado en el HTML generado: en `/credits/` →
  `aria-current="page"` en el enlace ES y `href="/cv-web/en/credits/"` en EN;
  el «Docs» de `/en/privacy/` apunta a `/cv-web/en/docs/`.
- Test de persistencia (`/tmp/opencode/test-lang-nav.mjs`, CDP puro): lang,
  toolbar traducida, marcador visible en ambas URLs, `localStorage` intacto y
  0 errores JS → **TODO OK**.

### 2026-10-28 · Ronda 12 — Bug del botón, copy de /credits y /privacy ✅

**Peticiones del usuario** (4) y decisiones tomadas (formulario de 10 preguntas):

| Petición | Decisión |
| --- | --- |
| «Esto se ve mal porque tiene los estilos del link» (botón de Ko-fi en `/privacy`) | **Causa raíz encontrada**: `.prose a` (0,1,1) le ganaba a `.btn` (0,1,0) → el botón salía azul y subrayado, y `.prose a:hover` (0,2,1) lo ponía **blanco sobre azul** al pasar el ratón. Fix: `.prose a:not(.btn)` + `:hover` homólogo, más `text-decoration: none` en `.btn` (defensa en profundidad) |
| «Mejora el texto y el estilo de crédito y de privacy para que sea asertivo y se entienda a la primera» | **Reestructuración libre** (elegida en el formulario): `/privacy` empieza por «La respuesta corta» (callout verde) y sigue con **6 preguntas numeradas**; `/credits` queda en 4 tarjetas + soporte. ES y EN reescritos en `dict.ts` |
| «Hay algo mal por ahí» / coherencia de los botones | **`src/components/DonateButton.astro`** (nuevo): componente único para `/credits` y `/privacy`, **siempre primario** (decisión del usuario en el formulario) |
| «Hay que hacer que la página se vea bien» | Badge «Software libre · GPL-3.0» en `/credits`, filete de acento en la tarjeta de soporte, numeración automática en la FAQ, verificación de las **6 páginas × ES/EN × desktop/móvil** |

**Cambios por fichero**

| Fichero | Qué |
| --- | --- |
| `src/styles/content.css` | `.prose a` → `.prose a:not(.btn)`; `.prose a:hover` → `.prose a:not(.btn):hover` |
| `src/styles/components.css` | `text-decoration: none` en el bloque base `.btn` |
| `src/components/DonateButton.astro` | **nuevo**: `<a class="btn btn-primary">` + símbolo Ko-fi local + `data-i18n` en el `<span>` (no en la `<a>`, o `apply()` borraría la `<img>`) |
| `src/i18n/dict.ts` | `/privacy`: 6 preguntas (antes 5, con `q2`/`q4` reescritas y `q5`→`q6`), claves `privacy.summary.title/body` y `privacy.a6b`; fuera `privacy.a3b` y `privacy.a4.1` (repartidas). `/credits`: `credits.lead`, `credits.own.body`, `credits.original.label`, `credits.repo`, `credits.license`, `credits.support.label/body`, `credits.badge` reescritas o nuevas |
| `src/pages/privacy.astro` | FAQ montada desde **un único array `faq` con claves** (mismo origen que el JSON-LD: no pueden desincronizarse), `<section class="qa">` por pregunta, callout de donación con el componente, estilos scoped (resumen verde, numeración, callout) y `<script type="application/ld+json">` con `FAQPage` |
| `src/pages/credits.astro` | badge + 4 tarjetas (soporte con `border-left` de acento) y `<DonateButton />`; fuera el `const base` sin uso |

**Hallazgos clave**

- **El bug era de especificidad CSS**, no del componente: cualquier `a.btn` dentro
  de `.prose` se rompía. Con `:not(.btn)` el subrayado de enlace queda reservado a
  los enlaces de texto de verdad (el de `xthecapx/cv-generator` en `/credits` lo
  confirma: se sigue subrayando).
- **JSON-LD desde el diccionario**: la FAQ visible y el `FAQPage` se generan del
  mismo array de claves → Google y el usuario leen lo mismo. `</` se escapa con
  `\u003c` para no romper el `<script>`.
- El script de verificación por **CDP puro** (`/tmp/opencode/shoot.mjs`, sin
  dependencias: node 24 trae `WebSocket`) sustituye al MCP de Playwright, que no
  está disponible en esta sesión. Nota: el scroll vive en `main.page`, no en
  `body` → para capturas "full page" hay que medir `main.page.scrollHeight` y
  sumar navbar + footer.
- En `/editor` el panel PDF sale **en blanco** en capturas con <3 s de espera: es
  el tiempo de render del worker, no un bug (ya verificado en rondas anteriores).

**Verificación**

- `npm run check` → **0 errores / 0 warnings / 1 hint** (el `base` sin usar de
  `/credits`, ya eliminado); `npm run build` → **6 páginas**.
- CSS construido (`dist/_astro/*.css`): aparece **sólo** `.prose a:not(.btn)` y
  `.prose a:not(.btn):hover`; ninguna regla `.prose a` suelta golpea a `.btn`.
- Capturas CDP (`chromium --headless`, `/tmp/opencode/shots/`): `/credits` y
  `/privacy` × **ES/EN** × **desktop 1280 / móvil 390** → botón Ko-fi **azul
  primario con texto oscuro y sin subrayado** en las 4 combinaciones, FAQ
  numerada, resumen verde, sin scroll horizontal en móvil y **0 errores JS**.
- Matriz completa: 6 páginas × ES/EN × desktop/móvil = **16 capturas** (landing,
  `/editor`, `/ai`, `/docs`) → **0 `Runtime.exceptionThrown`** en todas.
- El texto EN del botón («Support on Ko-fi») **sobrevive** al `data-i18n` en el
  `<span>`: el icono no se borra.

### 2026-10-26 · Ronda 11 — i18n desde dict, navbar, copy y botones ✅

**Peticiones del usuario** (4) y decisiones tomadas con él:

| Petición | Decisión |
| --- | --- |
| «No tiene sentido que haya texto en el HTML si ya se usa en JS…» | Opción **C**, preguntada: el HTML se **renderiza desde `dict.ts`** en el build (`src/i18n/server.ts` → `t(clave)`); cero duplicación y el HTML estático sigue con texto (SEO/sin JS) |
| «Quite unas cosas del footer» (delegado: «lo que consideres mejor») | Fuera la línea «100% Código abierto (GPL-3.0)» y el **diálogo de donaciones**, que **no tenía ningún disparador** (código huérfano desde la Ronda 10); el footer queda en 3 enlaces |
| «Tiene un borde inferior que se ve horrible» (navbar) | **Píldora de acento**: `background: var(--accent-soft)` + `color: var(--accent-2)`; eliminado `box-shadow: inset 0 -2px 0 var(--accent)` |
| «Quita la obsesión por GPL3» | **Sólo el sitio** (preguntado): mención única en `/credits` (tarjeta Licencia); fuera el badge del landing, el footer y `/privacy`. `LICENSE`, cabeceras de `src/lib/cv/*` y README intactos |
| «Los botones se ven muy genéricos» | Rediseño **global** (páginas + toolbar del editor): primario = azul de acento con texto oscuro (5.4:1, AA), secundario = panel con borde hairline, `:focus-visible` con anillo de acento, `is-done` = chip verde suave |

**Cambios por fichero**

| Fichero | Qué |
| --- | --- |
| `src/i18n/server.ts` | **nuevo**: `t(clave)` devuelve el texto ES de `dict` para inyectarlo en los `.astro` |
| `src/i18n/dict.ts` | copy nuevo ES/EN (`credits.lead` = el texto corto que escribió el usuario, `credits.own.body`, `credits.license`, `ai.desc`, pasos de `/ai`, 6 entradas de `/privacy`); claves nuevas `meta.title.*`, `meta.desc`, `landing.badge`; fuera `footer.os`, `footer.donate`, `donate.title/text/note` y `ui.close`; EN roto arreglado («Everything what you writes», «Al abrir usar web», «NOT US», «¿Que es…?») |
| `src/i18n/lang.ts` | `apply()` también traduce `document.title` (clave en `data-doc-title` de `<html>`) y la `meta description` (`data-i18n-content`) |
| `src/layouts/Layout.astro` | prop `titleKey` (clave tipada del dict) en vez de `title` suelto; description desde `t('meta.desc')` |
| `src/pages/*`, `Navbar`, `Footer` | todo texto visible → `{t('clave')}` con su `data-i18n` (70 apariciones); el badge del landing gana `data-i18n` (antes hardcodeado en inglés); `aria-label`/`title` también salen del dict |
| `src/styles/components.css` | píldora de navbar; `.btn`/`.btn-primary` rediseñados + anillo `:focus-visible`; `.btn.is-done` en verde suave; fuera `.footer .os`, `.modal-note`, `.link-btn` y el diálogo |
| `src/styles/content.css` | `.card-head` con hairline inferior, `.card-actions` nuevo (quita los `style="…"` inline de credits) y `h1` a 30px con `letter-spacing: -0.02em` |

**Hallazgos clave**

- **Texto muerto en HTML**: `apply()` pisaba el contenido de los `.astro` al arrancar;
  el `lead` que el usuario había editado en `credits.astro` no se llegaba a ver nunca.
  Con la opción C el copy vive **sólo** en `dict.ts`.
- **Bug del compilador** (documentado para futuras rondas): Astro 5.18.2 /
  `@astrojs/compiler` 2.13.1 **corrompe el código generado** («Unterminated string
  literal») con `import type { X }` en el frontmatter y con una `const` antes de un
  `import`. Workaround: importar valores (`{ dict }` e inferir `keyof typeof dict`) y
  llevar siempre los `import` al principio del frontmatter.
- El diálogo de donaciones del footer no tenía disparador en ningún sitio →
  eliminado; los botones Ko-fi de `/credits` y `/privacy` siguen intactos.

**Verificación**

- `npm run check` → **0 errores / 0 warnings / 0 hints**; `npm run build` → **6
  páginas**; `dist/` revisado: **1 sola aparición de GPL** (tarjeta de créditos),
  `<title>`, `meta description` y todos los textos salen del dict.
- Playwright (dev 4321): landing, `/editor`, `/ai`, `/docs`, `/credits`,
  `/privacy` × **ES/EN** × **desktop 1280 y móvil 390** → píldora activa, botones
  nuevos, diálogo de reset (**Esc cierra sin tocar nada**), «✓ Copiado» en chip
  verde, título de pestaña que sigue al idioma (`cv-web — Privacy`), footer limpio,
  **0 errores JS**.
- Tests de las rondas 7/8 en verde (`r7-test.cjs`, `r8-test.cjs` → «TODO OK»).

### 2026-10-26 · Ronda 10 — Donaciones + commit único ✅

**Decisión (preguntada al usuario)**: la migración a Buy Me a Coffee **se anula**
(«todo lo de Buy Me a Coffee se murió»); se mantiene Ko-fi y se usan sus assets
oficiales → *logo oficial en local*.

**Cambios**

| Fichero | Qué |
| --- | --- |
| `public/img/kofi-symbol.svg` | **nuevo**: símbolo oficial de Ko-fi (la taza, 3,2 KB) extraído del pack de marca oficial (`kofi_brandasset.zip`) |
| `src/components/Footer.astro` | botón del diálogo de donaciones: `<img class="kofi-ico">` + `<span data-i18n="donate.kofi">` (el `data-i18n` baja al `<span>` para que `apply()` no borre la etiqueta al traducir) |
| `src/pages/credits.astro` | igual, más `const base = import.meta.env.BASE_URL` |
| `src/pages/privacy.astro` | igual, más `const base` |
| `src/styles/components.css` | `.kofi-ico { width:20px; height:16px; flex:none; display:block }` (el `.btn` ya es `inline-flex` con `gap: 8px`) |

Sin tocar: ninguna URL (los 6 enlaces ya apuntaban a `ko-fi.com/neteumbra`), la
clave `donate.kofi`, ningún texto de `dict.ts` ni `README.md`. **Cero scripts de
terceros**: los snippets BMC/Widget de Ko-fi no se embebieron.

**Verificación**

- **Las 3 ubicaciones × ES/EN**: icono presente, `naturalWidth > 0` (asset cargado)
  y **sobrevive al cambio de idioma** (el `span` se traduce, la `img` no se toca);
  `href` intacto en las cuatro combinaciones.
- **Privacidad**: `performance.getEntriesByType('resource')` en `/credits/` →
  **57 recursos, 0 de terceros, 0 a `ko-fi.com`**; la imagen se sirve 3 veces desde
  `localhost:4321/cv-web/img/kofi-symbol.svg`.
- **Móvil 390×700**: sin scroll horizontal, botón dentro de la pantalla, icono
  20×16 y el botón sin desbordar su propio contenido.
- **Capturas** (`.playwright-mcp/r10-dialogo.png`, `r10-privacy.png`,
  `r10-mobile-credits.png`): la taza naranja sobre el botón verde se lee bien.
- `npm run check` → **0 errores**; `npm run build` → **6 páginas** con
  `dist/img/kofi-symbol.svg` incluido y `src="/cv-web/img/kofi-symbol.svg"` en el
  HTML (respeta el `base`); tests **57/57 + 26/26** en verde.
- `grep -ri buymeacoffee` en `dist/`, `src/` y `README.md` → **0 resultados**.

### 2026-10-26 · Ronda 9 — Verificación integral ✅

**Dos arreglos encontrados al verificar** (ambos pequeños y cubiertos por tests):

| Sitio | Problema | Arreglo |
| --- | --- | --- |
| `cvConverter.ts` → `cvToMarkdown` | terminaba con `return markdown.trim()` → el `.md` exportado salía **sin salto de línea final** (los editores avisan «No newline at end of file») | `markdown.trim() + '\n'`: forma canónica + fin de fichero POSIX |
| `src/data/default.md` y `default.en.md` | los ejemplos del repo **no estaban en forma canónica** (les faltaba la línea en blanco tras el frontmatter) → el primer clic en «Autoformatear» reescribía el ejemplo de todo usuario nuevo | regenerados con el propio parser (`regen.ts` en `/tmp/opencode`): +1 línea en blanco, `\n` final conservado, `formatIsLossless=true` e idempotentes |
| `docs/formato-cv.md` / `.en.md` §7 | el ejemplo completo mostraba `---` pegado al `# Nombre` (no canónico) | línea en blanco añadida en ES y EN |

**Matriz de verificación** (dev 4321, MCP de Playwright, `prefers-reduced-motion: reduce`,
perfil aislado y efímero — sólo `cv-web:markdown` y `cv-web:lang`):

| Página | Desktop ES | Desktop EN | Móvil 390×700 EN | Móvil 390×700 ES |
| --- | --- | --- | --- | --- |
| `/` (landing) | 12/12 | ✅ | ✅ | ✅ |
| `/editor/` | ✅ (diálogo + toasts + descargas) | ✅ | ✅ | ✅ |
| `/ai/` | ✅ (prompt 4368 chars) | ✅ | ✅ | ✅ |
| `/docs/` | ✅ (7 `h2`) | ✅ | ✅ | ✅ |
| `/credits/` | ✅ | ✅ | ✅ | ✅ |
| `/privacy/` | ✅ (7 `h2`) | ✅ | ✅ | ✅ |

- **Landing (12/12)**: `html lang`, `h1`, mock con **9 líneas** y **sin `.play`** con
  `reduce` (0 animaciones en ejecución), segmented control con radios **6px**, 3 SVG
  en la navbar y **cero emoji**, 2 CTA, footer → `/cv-web/privacy/`, sin scroll.
- **Diálogo de reset**: abrir → `open` + el markdown intacto (405 chars) → **Esc cierra
  sin tocar nada** → «Cancelar» cierra sin tocar nada → «Restablecer» → 2129 chars con el
  ejemplo ES + toast «CV de ejemplo restaurado» (`tone: ok`).
- **Toasts**: muestreado en vivo → visibles desde 0 hasta ~2,6 s y ocultos a 2,7 s
  (el texto permanece), `data-tone` correcto. Formateo: «Markdown formateado» en la 1ª
  pasada y «El markdown ya está formateado» en la 2ª (idempotencia real).
- **Descargas**: el navegador del MCP las deposita en `.playwright-mcp/` →
  `cv-alex-garcia-rivera.md` **byte a byte idéntico al `localStorage`** (mismo SHA-256)
  y `cv-alex-garcia-rivera.pdf` válido (`%PDF-1.3`, 7011 B).
- **`/ai/`**: «Copiar prompt» → `is-done` + «✓ Copiado» (permiso de portapapeles OK).
- **Móvil**: `scrollWidth === 390` en las 12 combinaciones, 0 elementos desbordados
  (los `CODE` largos de `/docs/` viven en un `pre { overflow-x: auto }` → no mueven la
  página), `wtabs` en flex, toolbar ES/EN cabe, menú acordeón `aria-expanded` true →
  **Esc lo cierra**.
- **0 errores JS** en toda la sesión (console `level=error`).
- `npm run check` → **0 errores / 0 warnings / 0 hints**; `npm run build` → **6 páginas**;
  tests **57/57** (parser) + **26/26** (inline) en verde tras los cambios de esta ronda.

### 2026-10-26 · Ronda 8 — Negrita y cursiva ✅

**Problema**: el parser pasaba el texto en línea tal cual (bien), pero el PDF sólo
sabía pintar `[texto](url)`; `**negrita**` y `*cursiva*` salían con los asteriscos
a la vista. Y con viñetas como `* logro`, un tokenizador ingenuo podía confundir
asterisco de lista con cursiva.

**Cambios**

| Fichero | Qué |
| --- | --- |
| `src/lib/cv/inline.ts` | **nuevo módulo puro** `tokenizeInline(texto) → tokens[]`: orden de intentos enlace → `**negrita**` → `*cursiva*`/`_cursiva_`, con guardia `gluedToWord` (un `_` pegado a una palabra no abre cursiva → `mi_archivo_de_prueba` se imprime literal) y pares sin cerrar que salen como texto |
| `Section.tsx` | `DetailText` reescrito: `inlineNodes()` **recursivo** (token `bold` → tokeniza su interior → `**negrita con [enlace](url)**` pinta negrita *y* enlace a la vez), estilos `bold: fontFamily 'Helvetica-Bold'` y `italic: fontStyle 'italic'` (variante `Helvetica-Oblique` registrada); el énfasis sólo aplica a **detalles y párrafos**, no a `##`/`###`/`####` |
| `docs/formato-cv.md` / `.en.md` | §5 pasa de «Enlaces» a **«Enlaces, negrita y cursiva»** (5 reglas: sintaxis, no en títulos, combinación, par sin cerrar literal); §6 gana «no reescribe la sintaxis en línea» |
| `dict.ts` → `ai.prompt` (ES/EN) | punto 6 ampliado a **enlaces y énfasis** («copia el énfasis tal como aparece en mi original; no inventes negritas ni cursivas nuevas»), «RESPETO DEL ORIGINAL» incluye énfasis, ejemplo con `**TypeScript**` |

`inline.ts` es puro y sin dependencias → se prueba con Node directamente (sin
tocar `localStorage` ni navegador).

**Hallazgo durante la verificación (bug preexistente, arreglado)**

- El PDF pintaba **`Phone:` (o `Email:`) aunque el campo estuviera vacío**: la fila
  de contacto era condicional sólo para `location`. Criterio unificado con el
  formateo («omite los campos de contacto vacíos»): ahora `contactFields[]` se
  construye con `if (phone/email/location)`, la fila no se pinta si está vacía y
  `title` sólo se pinta con valor (antes dejaba una línea en blanco bajo el
  nombre). Documentado en **§2** ES/EN. Sin cambios visuales cuando los campos
  existen (el resto de la fila sale idéntico).

**Verificación** (dev 4321, `prefers-reduced-motion: reduce`)

- **Tests**: `/tmp/opencode/r7-test.ts` **57/57** y `/tmp/opencode/r8-test.ts`
  **26/26** (tokenizador: enlaces, negrita, cursiva, `_x_` pegado, pares sin
  cerrar, `* logro` sigue siendo viñeta, recursión con enlace dentro de negrita,
  round-trip con énfasis sin pérdidas ni reescritura). Empaquetados con el
  `esbuild` de Astro.
- **Desktop ES/EN**: `/docs/` **10/10** + **11/11** (§5 nueva, ejemplo con
  `**pagos**`, «no reescribe la sintaxis en línea», ejemplo numerado, ids del
  artículo oculto = 0); `/ai/` **6/6** + **6/6** (sintaxis del punto 6, «no
  inventes», «énfasis (negrita/cursiva)», ejemplo con `**TypeScript**`).
- **Editor**: CV de prueba (405 chars) con `**negrita**`, `*cursiva*`,
  enlace anidado dentro de negrita, `mi_archivo_de_prueba` y `1./2.` →
  **1ª pasada y 2ª pasada «El markdown ya está formateado»** (mi markdown ya era
  canónico = idempotencia real) y los 405 chars intactos.
- **Capturas del PDF** (`.playwright-mcp/r8-*.png`): `TypeScript` en negrita,
  `equipos remotos` en cursiva **y** enlace azul a la vez, `negrita` en negrita
  con `enlace` en azul dentro, `escucha activa` en cursiva,
  `mi_archivo_de_prueba` **literal**, `1.`/`2.` numerados y —tras el fix—
  contacto sólo con `Email:` (sin `Phone:` hueco).
- **Móvil 390×700**: `/docs/` ES y EN sin scroll horizontal + §5 traducida,
  `/editor/` sin desbordes, toolbar cabe, `wtabs` visibles y pestaña PDF pinta.
- **0 errores JS** en toda la pasada; `npm run check` **0 errores** (30 ficheros)
  y `npm run build` **6 páginas**.
- **Nota de entorno**: Vite sirvió un **504 Outdated Optimize Dep** tras el
  reinicio del harness (el optimizador se re-ejecutó y el navegador tenía el hash
  viejo) → la app no arrancaba (toggle de idioma muerto). Arreglado reiniciando el
  dev server y borrando `node_modules/.vite`, no era un bug de la app.

### 2026-10-25 · Ronda 7 — Texto plano en cualquier posición + listas numeradas ✅

**Problemas que resolvía el encargo** (antes):

- Una línea sin viñeta **después** de un `###`/`####` o después de una lista se
  **caía en silencio** (no era `plain`, no era viñeta → fin del bucle).
- Una viñeta pegada a un párrafo **se metía dentro del item de párrafo**: al
  formatear salía sin `- ` (el flag `plain` era por item) → o pérdida real o
  bloqueo del formateo. Era el «la viñeta se traga».
- El texto **antes del primer `##`** se descartaba sin avisar.
- `1. logro` no se reconocía como lista.
- `####` sin `###` previo se ignoraba.

**Cambios**

| Fichero | Qué |
| --- | --- |
| `types.ts` | nuevo **`CvDetail { text, marker? }`**: `details` pasa de `string[]` a `CvDetail[]`; `marker` guarda el prefijo original (`-`, `*`, `+`, `1.`, `2)`); `CvSection.preamble` para el contenido anterior al primer `##` |
| `cvConverter.ts` | `listMarker()`/`listText()` (viñetas y numeración, con `\d{1,3}[.)]`); bucle reescrito: texto plano en **cualquier posición**, la viñeta que llega tras un párrafo **abre entrada nueva**, `####` crea la entrada si no existe, contenido previo al `##` → sección de entrada sin título; `cvToMarkdown` escribe cada línea con **su** marcador y omite el `##` de la sección de entrada; `validateCvMarkdown` ya no exige título |
| `Section.tsx` | render por detalle: sin marcador → texto apilado; `-`/`*`/`+` → `•`; numerado → **el número tal cual** (`1.`, `3)`) con columna de ancho dinámico; sin cabecera si la sección no tiene título; el contenedor de detalles se pinta siempre (sus márgenes son el espaciado original) |
| `docs/formato-cv.md` + `.en.md` | §4 con las reglas nuevas (tabla + 4 reglas de texto plano/listas), §6 con «conserva el marcador», §7 con `## IDIOMAS` numerado |
| `dict.ts` → `ai.prompt` (ES/EN) | punto 5 ampliado (párrafo en cualquier posición, `*`/`+`, listas numeradas) y ejemplo completo con `## IDIOMAS` numerado |

**Verificación**

- **Tests del parser (57/57)** en `/tmp/opencode/r7-test.ts`, empaquetados con el
  `esbuild` que ya trae Astro (sin dependencias nuevas): round-trip **sin
  pérdidas + idempotente + estructura estable** de `default.md` y
  `default.en.md`, párrafo tras `##`, antes del `##`, dentro de la entrada y
  tras la lista, viñeta que abre entrada nueva, `####` suelto, numeración y
  marcadores `*`/`+` conservados, «ninguna línea desaparece» y contacto intacto.
  (Fallo inicial era del propio test: comparaba JSON por orden de claves →
  clave ordenada.)
- **E2E desktop (27/27)**: `/docs/` ES y EN con las filas nuevas + ejemplo
  numerado, prompt ES/EN, formato en el editor (1ª pasada «Markdown formateado»
  sin cancelar, numeración/asterisco/intro intactos, 2ª pasada «ya está
  formateado» = idempotente), preview PDF montado y **0 errores JS**.
- **Captura del PDF**: la intro sale **sin cabecera de sección**, IDIOMAS pinta
  `1.`/`2.`, el párrafo dentro de la entrada sale sin viñeta, `*` se pinta como
  viñeta y la nota final tras la lista no se traga.
- **Móvil 390×700 (7/7)**: docs ES/EN sin scroll horizontal, numeración
  documentada en ambos idiomas, editor y toolbar sin desbordes.
- `npm run check` (0 errores) y `npm run build` (6 páginas) ✅.

### 2026-10-25 · Ronda 6 — Refactor JS/TS + `npm run check` ✅

**Módulos nuevos**

| Fichero | Qué centraliza (antes vivía repartido) |
| --- | --- |
| `src/lib/events.ts` | constantes `CV_LANG`/`CV_TOAST` + `emitLang`/`emitToast`/`onLang` (antes 11 literales `'cv-lang'`/`'cv-toast'` en 6 ficheros) |
| `src/lib/toast.ts` | `toast()` importable + `initToasts()`; **borrado `window.cvToast`** (`ai.astro` importa `toast` directo) |
| `src/i18n/lang.ts` | `readLang()`, **`$lang` (nanostores)**, `t()` tipado, `entry()`, `apply()`, `setLang`/`toggleLang`, `initI18n()` — todo el motor que estaba inline en `Layout.astro` |
| `src/i18n/react.ts` | hooks `useLang()`/`useT()` (aparte, para no arrastrar React al bundle del Layout) |
| `src/components/ResetDialog.tsx` | el `<dialog>` de «↺ Reiniciar» (React 19: `ref` como prop) |

**Cambios**

- `Layout.astro`: el `<script>` pasa de ~50 líneas a `initI18n(); initToasts();`.
- **Eliminada la triplicación de `currentLang()` + listener `cv-lang`** en `Toolbar`,
  `PdfPreview` y `Workspace`: ahora `useStore($lang)` / `useT()`. El toolbar
  re-renderiza en caliente al cambiar de idioma (verificado sin reload).
- `dict.ts`: `satisfies Record<string, Entry>` + `export type DictKey` →
  `t('tb.pdf', lang)` compila, `t('tb.noexiste', lang)` no. Clave nueva
  **`ai.copy.blocked`** (el toast de portapapeles bloqueado estaba hardcodeado en los 2
  idiomas dentro de `ai.astro` — violaba la regla 2).
- `stores/cv.ts` usa `readLang()`; **borrado `savedLang()`** de `data/examples.ts`
  (duplicaba la misma lectura de `cv-web:lang`).
- `package.json`: script **`check` → `astro check`** + devDep `@astrojs/check` (aprobado
  en el plan). `typescript` ya estaba.
- Dos errores **preexistentes** de tipado de `@react-pdf/renderer` arreglados para dejar
  el check limpio: `pdf.ts` (`pdf()` exige `<Document>` directo → cast documentado) y
  `Section.tsx` (el `style` resuelto de `<Text>` incluye atributos SVG → se usa
  `TextProps['style']`, que es `StyleProp` puro).

**Verificación** (dev 4321, `prefers-reduced-motion: reduce`)

- `npm run check` → **0 errores / 0 warnings / 0 hints** (29 ficheros).
- `npm run build` → **6 páginas**.
- Desktop 1280×800 (**39/39**): toggle ES↔EN en landing (`<html lang>`, label, `aria-label`,
  persistencia), toolbar ES/EN re-render en caliente, toast de formateo (visible + auto-oculto),
  diálogo (`showModal`, `Esc`, cancelar intacto, confirmar → ejemplo EN/ES + toast correcto),
  `/ai/` (label, `is-done` y **`ai.copy.blocked`** con portapapeles bloqueado a propósito),
  `/docs/` (artículos conmutan + ids sólo en el visible), `/credits/` y `/privacy/`,
  **0 errores JS** y `localStorage` idéntico al backup.
- Móvil 390×700 (**15/15**): sin scroll horizontal en landing/editor (ES y EN), menú
  `is-open` + `aria-expanded` + `Esc`, `wtabs` visibles, pestaña PDF, toolbar sin
  desbordamiento, diálogo cabe (356px), toast en EN.
- **Nota sobre el entorno**: el MCP de Playwright no está conectado en esta sesión (el
  harness se reinició); la verificación se hizo con `playwright-core` de la caché de npx
  + `/usr/bin/chromium` (scripts en `/tmp/opencode/r6-*.mjs`). Ese Chromium usa **perfil
  aislado y efímero**: comprobado que no hay `cv-web:markdown` en el perfil real del
  usuario ni en `/tmp` — es decir, no se ha tocado ningún localStorage real (los datos
  que manejaba el MCP se evaporaron con el reinicio del server, antes de esta ronda).
  Los scripts fallaron primero por **bugs del propio guion** (asumía ES cuando la app
  estaba en EN, y contaba `id=""` como id duplicado): corregidos, 39/39 y 15/15.

### 2026-10-25 · Ronda 5 — Refactor CSS: extracción a `src/styles/` ✅

- **`Layout.astro` pasa de 949 a 90 líneas**: el `<style is:global>` (863 líneas) se extrajo
  por rangos exactos, **sin reformatear ni reordenar**, a 7 ficheros:
  | Fichero | Contenido | Líneas |
  | --- | --- | --- |
  | `tokens.css` | variables del tema | 38 |
  | `base.css` | reset, foco, selección, `prefers-reduced-motion` | 35 |
  | `components.css` | botones, navbar, `.page`, footer+diálogo, toast | 247 |
  | `landing.css` | hero, CTAs y mock animado | 184 |
  | `editor.css` | toolbar, workspace, pestañas, preview PDF | 109 |
  | `content.css` | `/ai`, `/credits`, `.prose` (docs/privacidad) | 183 |
  | `responsive.css` | `@media` 800/700/640 + `nav-in` | 82 |
- **Imports en el frontmatter de `Layout.astro`** con el **orden de la cascada original**
  (documentado en el propio fichero: no reordenar).
- **Contabilidad exacta**: 863 líneas del bloque original = 863 líneas extraídas
  (877 - 14 líneas de cabecera) + 3 líneas borradas de reglas muertas.
- **Reglas muertas borradas** (confirmadas con grep en todo `src/`, 0 usos):
  `.btn-ghost` (2 líneas) y `.copy-status` (1 línea). `is-visible` **no** era muerta
  (la usa el toast).
- **Verificación de "cero cambio visual"** con `prefers-reduced-motion: reduce` (mock
  determinista) y 1280×800:
  - **5 de 6 páginas idénticas byte a byte** antes/después (`cmp`): `/`, `/ai`, `/docs`,
    `/credits`, `/privacy`.
  - `/editor/` **no es determinista** (se demostró con 3 capturas post-refactor con 3 hashes
    distintos): el `split` se restaura a 51,5 % *después* del primer render (una captura
    salió al 50 %, cambiando el wrap de todo el texto) y el PDF del preview llega async.
    Diferencias explicadas por el timing, no por el CSS.
  - Bundle de producción: `dist/_astro/*.css` con las 4 media queries, las keyframes
    (`ln-type`, `sheet-in`), `--render-step` y **0** restos de las reglas muertas.
- `npm run build` (6 páginas) ✅.

### 2026-10-25 · Ronda 4 — Ejemplo bilingüe de reset ✅

- **`src/data/default.en.md`** (nuevo): traducción del ejemplo ES con **idéntica
  estructura** (mismas claves de contacto, secciones y `\break`) para que parser,
  `cvToMarkdown` y `formatIsLossless` se comporten igual en ambos.
- **`src/data/examples.ts`** (nuevo): `examples: Record<Lang, string>` + `savedLang()`,
  que lee `cv-web:lang` con el mismo criterio que el script de i18n de `Layout.astro`
  (sólo `'en'` activa inglés). Se lee de `localStorage` y no de `<html lang>` porque el
  store a veces se inicializa antes que el script de i18n.
- **`stores/cv.ts`**: primer arranque → `examples[savedLang()]` en vez de `defaultMd`.
- **`Toolbar.tsx`**: «↺ Reiniciar» → `examples[currentLang()]` (antes siempre el ES).
- **Fix menor** del ejemplo ES: «mejora a paso» → «paso a paso».
- **Verificación** (con backup y restauración del `localStorage` real del usuario,
  clave temporal `cv-web:markdown:bak-r4` eliminada al final):
  1. Reset en ES → ejemplo ES (2129 chars, «RESUMEN PROFESIONAL»).
  2. Reset en EN → ejemplo EN (1950 chars, «Sample CV»/«PROFESSIONAL SUMMARY»).
  3. Arranque limpio en EN → ejemplo EN.
  4. Arranque limpio en ES → ejemplo ES.
  5. Ejemplo EN parsea (botón PDF habilitado).
  - Restaurado: md 3167 chars con el CV del usuario, `lang=es`, `split=51.5`,
    sólo las 3 claves originales.
- `npm run build` (6 páginas) ✅.

### 2026-10-25 · Ronda 3 — Animación del mock ("escribe → renderiza") ✅

- **Markup** (`index.astro`): el `<pre>` del código pasa a `<div>` con una
  `<span class="ln" style="--i:n">` **por línea** (9 líneas, la vacía incluida) y
  `<div class="mock play">`. La hoja PDF ya existed de 7 hijos que se animan por
  `nth-child`.
- **CSS** (`Layout.astro`), todo bajo `.mock.play`:
  - Líneas: `clip-path: inset(0 100% 0 0)` → `inset(0)`, retardo `calc(var(--i) * .24s)`.
  - Cursor `▌`: `::after` de cada línea en `--accent`, parpadea 2 veces durante
    0,42 s a partir de que la línea termina de escribirse (`content` sólo existe con
    `.play`, así que en modo estático no queda nada).
  - Hoja: `sheet-in` (fade + 5px) en cascada desde 1,6 s con paso 0,14 s.
  - Constantes de la secuencia como variables en `.mock` (`--step`, `--type`,
    `--render`, `--render-step`) para que el timing se lea en un sitio.
  - **Estado base = todo visible**: las animaciones sólo se declaran con `.play`,
    así que sin JS o con `reduce` el mock se ve completo y quieto.
- **Bucle**: script en `index.astro` que reinicia `.play` cada 4,8 s (remove →
  reflow → add) y escucha `matchMedia('(prefers-reduced-motion: reduce)')`
  (`change`) para detenerse/reanudar sin recargar.
- **i18n del mock**: sus textos eran visibles y estaban sólo en español; se movieron
  a `dict` (`landing.mock.*`, 10 claves) con `data-i18n` — ahora el hero en EN muestra
  `# Name`, `## EXPERIENCE`, etc.
- **Verificación:** `npm run build` (6 páginas) + Playwright: delays computados
  (líneas 0→1,92 s, hoja 1,6→2,44 s), fotogramas a media escritura y a media
  renderización, `reducedMotion: reduce` (sin `.play`, `animation: none`, todo
  visible) y al restaurarlo (reasume), EN con textos traducidos, móvil 390 sin
  desbordes. Capturas revisadas y borradas.

### 2026-10-25 · Ronda 2 — Navbar: control segmentado ✅

- **Markup** (`Navbar.astro`): el grupo derecho pasa de píldoras sueltas
  (`border-radius: 999px`) a **un control segmentado** `.nav-actions` con borde único,
  radios de 6px (`--radius-sm`) y hairlines internos entre segmentos
  (`> *` + separadores con `border-left`, extremos redondeados con `:first/:last-child`).
- **Iconos SVG** en vez de emoji: globo (idioma), ☰/✕ (menú) con `stroke: currentColor`;
  fuera `🌐`, `☰` y `✕` de texto. La conmutación `icon-open`/`icon-close` por
  `[aria-expanded]` se mantiene.
- **Estado activo** del segmento Docs con `--accent-soft`/`--accent-2`; hover con
  `--panel-3`; foco de teclado `outline: 2px solid var(--accent)` **inset**
  (`outline-offset: -2px`) para que no desborde el segmento.
- **i18n de los `aria-label`**: nuevo soporte `data-i18n-aria` en el `apply()` de
  `Layout.astro` + claves `nav.actions`, `nav.lang`, `nav.menu` en `dict.ts`.
  El texto del segmento de idioma ahora es `<span id="lang-label">` (antes el script
  pisaba el botón entero con `textContent`, lo que habría borrado el SVG).
- **Bug preexistente arreglado (hallazgo de la verificación):** el CTA secundario del hero
  desbordaba el ancho del móvil (`.btn { white-space: nowrap }` + texto largo) y hacía
  scroll horizontal dentro de `.page` en 390px. Fix: `.actions { max-width: 100% }` y
  `.actions .btn { white-space: normal; text-align: center }` en el `@media (max-width: 640px)`.
- **Verificación:** `npm run build` (6 páginas) + Playwright — desktop ES/EN, móvil 390 ES/EN,
  menú acordeón abierto, estado activo en `/docs`, aria-labels ES/EN, `htmlLang`, foco de
  teclado y **0 elementos desbordados** en 390px. Capturas en `r2-*.png` (borradas tras revisar).

### 2026-10-25 · Ronda 1 — Cimiento + skills ✅

- **`AGENTS.md`**: qué es el proyecto, stack, comandos, estructura y 11 reglas generales
  (cero `alert/confirm/prompt`, i18n en `dict.ts`, `docs/` como fuente única, variables del
  tema, privacidad, no tocar `localStorage` del usuario, verificación ES/EN, skills locales,
  un solo commit al final).
- **`.gitignore`**: añadido `.opencode/skills/` (sólo ese directorio; el resto de `.opencode/`
  sí se versionará cuando exista config).
- **Skills de diseño descargadas** de sus repos oficiales a `.opencode/skills/`:
  - `frontend-design` ← `anthropics/skills` (`SKILL.md` + `LICENSE.txt`, Apache-2.0).
  - `web-design-guidelines` ← `vercel-labs/agent-skills` (`SKILL.md`; trae las reglas de
    `vercel-labs/web-interface-guidelines` en tiempo de ejecución).
  - **Verificado:** OpenCode las detecta y las anuncia en el catálogo de skills.
- **`PROGRESS.md`** (este fichero).

### Prehistoria (antes de organizar las rondas) ✅

Todo verificado con build + Playwright (ES/EN, desktop y móvil), sin commitear:

- **Footer**: fuera "Hecho con Astro"; "Nada sale de tu navegador" enlaza a `/privacy`.
- **`/privacy`**: FAQ con preguntas `<h2>` (sin cards), lenguaje llano y callout de donación
  a Ko-fi al final. Estilos `.prose` movidos a `Layout.astro` para compartirlos con `/docs`.
- **Navbar**: píldora **Docs** fuera del acordeón; grupo móvil `[Docs][🌐ES][☰]`.
- **Prompt IA (`/ai`)**: ejemplo completo (frontmatter, `\break`, enlaces, clave de contacto
  extra) + línea de entrega "todo en un solo bloque de texto markdown, sin cercarlo con ```".
- **Docs bilingües**: `docs/formato-cv.md` (ES) + `docs/formato-cv.en.md` (EN), visibilidad por
  idioma sin `id` duplicados y enlace al fichero del idioma activo.
- **Toolbar**: bug de «↺ Reiniciar» arreglado (diálogo dentro de `<form method="dialog">`),
  fuera el botón «↑ Markdown», descarga `.md` con nombre `cv-<slug>.md` (toast actualizado).
- **Parser**: claves de contacto desconocidas (`contact.other[]`) se pintan en el PDF.
- **Descargas**: investigado el "archivo raro sin extensión" → **no es un bug**: el navegador
  del Playwright MCP intercepta las descargas y las guarda en `.playwright-mcp/`; Firefox
  (normal) sí deposita en `~/Downloads` con el nombre correcto. Ambos botones generan
  ficheros válidos (verificado byte a byte).

### Pendientes heredados

- Ninguno fuera del plan: los dos que había (texto plano/negrita/listas y descargas) ya están
  en las rondas 7-8 o resueltos.

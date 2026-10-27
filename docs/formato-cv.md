# Formato del CV

Este documento es **la fuente única** del formato que entiende `cv-web`,
en español. La versión en inglés está en
[`docs/formato-cv.en.md`](formato-cv.en.md). Los dos viven en la raíz del repo
para ser visibles en GitHub y se renderizan como página del sitio en
[`/docs`](https://neteumbra.github.io/cv-web/docs/), que muestra el idioma que
tengas seleccionado en la barra superior.

Todo el CV vive en un solo archivo Markdown. El editor lo parsea
(`markdownToCv`), lo muestra en vivo como PDF (`CvDocument`) y lo vuelve a
escribir normalizado con el botón **⌘ Autoformatear** (`cvToMarkdown`).

---

## 1. Frontmatter (opcional)

```markdown
---
title: CV de ejemplo
year: 2026
tags:
  - CV
  - Ejemplo
---
```

Si no hay frontmatter, el parser no falla: simplemente no hay metadatos.

## 2. Nombre y contacto

El nombre va como encabezado de primer nivel y, justo debajo, la lista de
contacto en formato `clave: valor` (una línea por dato):

```markdown
# Alex García Rivera
- title: Desarrollador de Software Full-Stack
- Phone: +34 600 000 000
- Email: alex.garcia@ejemplo.com
- Ubicación: Madrid, España
- LinkedIn: linkedin.com/in/alex-garcia-ejemplo
- GitHub: github.com/alexgarcia-ejemplo
- Portafolio: alexgarcia.dev
```

| Clave aceptada (sin distinción de mayúsculas ni acentos) | Qué hace en el PDF |
| --- | --- |
| `title` | Puesto, en negrita bajo el nombre |
| `Phone`, `Teléfono`, `Tel`, `Móvil` | Enlace `tel:` |
| `Email`, `Correo`, `Mail` | Enlace `mailto:` |
| `Location`, `Ubicación`, `Ciudad`, `País` | Texto de ubicación |
| `LinkedIn`, `GitHub`, `Portafolio`, `Web`, `Blog`, `Twitter`… | Enlace azul subrayado en la cabecera |
| cualquier otra clave | Se muestra en la cabecera del PDF y se reescribe tal cual (no se pierde) |

Las etiquetas originales se respetan: si escribes `Teléfono`, el PDF mostrará
`Teléfono`; no se traduce automáticamente.

Los campos sin valor no se pintan en el PDF: sin `Phone:` no hay `Phone:` en la
cabecera, y lo mismo con `title`, `Email`, `Ubicación` y las enlaces de
cabecera (mismo criterio que el formateo, que omite los campos vacíos).

Las URLs se normalizan al renderizar (`normalizeUrl`): `github.com/…`,
`https://github.com/…` y `https://https://github.com/…` acaban apuntando al
mismo sitio.

## 3. Secciones

```markdown
## EXPERIENCIA PROFESIONAL
```

- Cada `##` abre una sección con su título en la cabecera de la página.
- Para forzar **página nueva** antes de una sección, añade ` \break` al final
  del título:

  ```markdown
  ## CERTIFICACIONES \break
  ```

## 4. Contenido dentro de una sección

| Sintaxis | Significado |
| --- | --- |
| Texto suelto en cualquier posición | Párrafo **sin** viñeta: tras el `##`, antes de la primera entrada, dentro de una `###` o después de una lista |
| `### Empresa \| Lugar` | Entrada principal (la parte derecha va tras el `\|`) |
| `#### Rol \| Fecha` | Subentrada (periodo, puesto, etc.) |
| `- logro`, `* logro`, `+ logro` | Detalle con viñeta (el marcador original se conserva) |
| `1. logro` / `2) logro` | Lista numerada: el PDF pinta **el número que escribiste** |
| `- Clave: valor` | Detalle normal (no se interpreta como contacto) |

Reglas del texto plano y de las listas:

- Las líneas de texto seguidas forman **un solo párrafo**. Si después de un
  párrafo pegas una viñeta, la lista **abre una entrada nueva**: la viñeta no
  se cuela en el párrafo, no se pinta dentro del resumen y no se pierde al
  formatear.
- Dentro de una entrada (`###`/`####`), una línea sin viñeta se guarda como
  detalle de esa misma entrada y se pinta sin viñeta.
- El texto que pongas **antes del primer `##`** (ojo: después del bloque de
  contacto) se pinta como párrafo de entrada, sin cabecera de sección.
- Los marcadores se respetan letra por letra: `-`, `*` y `+` no se convierten
  entre sí y `1. 2. 3.` sigue siendo `1. 2. 3.` también en el PDF.

En los títulos `###` también se admite ` \break` para partir la entrada en dos
páginas (en `####` y en las viñetas no tiene efecto).

## 5. Enlaces, negrita y cursiva

Dentro de cualquier detalle o párrafo:

```markdown
- Implementé [el proyecto en GitHub](github.com/usuario/repo) con React y Node.js
- Lideré el equipo de **pagos**, con *especial atención* a la accesibilidad
```

- **Enlaces** `[texto](url)`: se pintan en azul subrayado (`#1155cc`) y son
  clicables en el PDF. Las URLs sin esquema reciben `https://` automáticamente.
- **Negrita** `**texto**` y **cursiva** `*texto*` (también `_texto_`, pero solo
  cuando la pareja no está pegada a una palabra: `mi_archivo` no se convierte
  en cursiva).
- El énfasis y los enlaces se admiten **en detalles y párrafos**, no en los
  títulos `##`, `###` y `####` (allí el peso ya lo pone la cabecera).
- Se pueden combinar: `**negrita con [enlace](url)**` pinta la negrita y el
  enlace a la vez.
- Un par sin cerrar (`**sin cerrar`) se pinta literal: si no hay asterisco de
  cierre, no hay énfasis.

## 6. Autoformatear

El botón **⌘ Autoformatear** reescribe el markdown siguiendo estas reglas:

- conserva las etiquetas originales (`Teléfono`, `Ubicación`…);
- omite los campos de contacto vacíos;
- respeta los párrafos sin viñeta (por ejemplo, el resumen) en cualquier posición;
- conserva el marcador de cada línea de lista tal cual (`-`, `*`, `1.`, `2)`…);
- no reescribe la sintaxis en línea: `**negrita**`, `*cursiva*` y los enlaces
  salen literalmente como los escribiste;
- devuelve tal cual las claves de contacto no reconocidas;
- normaliza separaciones, sangrías y líneas en blanco.

No borra contenido: si el resultado no cambia, verás el aviso «el markdown ya
está formateado», y si el formateo detectase que se perdería alguna línea,
**no aplica los cambios** y lo avisa («Formateo cancelado…»).

## 7. Ejemplo completo

```markdown
---
title: CV de ejemplo
year: 2026
tags:
  - CV
  - Ejemplo
---

# Alex García Rivera
- title: Desarrollador de Software Full-Stack
- Phone: +34 600 000 000
- Email: alex.garcia@ejemplo.com
- Ubicación: Madrid, España
- LinkedIn: linkedin.com/in/alex-garcia-ejemplo
- GitHub: github.com/alexgarcia-ejemplo
- Portafolio: alexgarcia.dev
- Disponible: freelance y remoto

## RESUMEN PROFESIONAL
Desarrollador con más de ocho años de experiencia en aplicaciones web y
servicios en la nube. Ver [el proyecto de ejemplo](github.com/alexgarcia-ejemplo).

## EXPERIENCIA PROFESIONAL
### Nordata Solutions | Remoto \break
#### Desarrollador Full-Stack Senior | 2021 - Presente
- Diseño de una plataforma SaaS de analítica para más de 200 clientes
- Migración de un monolito legacy a servicios Node.js en AWS

## HABILIDADES TÉCNICAS
- Lenguajes: TypeScript, JavaScript, Python, SQL
- Frontend: React, Astro, CSS moderno
- Backend y nube: Node.js, PostgreSQL, Docker, AWS

## IDIOMAS
1. Español: nativo
2. Inglés: nivel profesional (C1)

## CERTIFICACIONES \break
- AWS Certified Developer – Associate (2024)
```

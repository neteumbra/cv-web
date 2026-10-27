export type Lang = 'es' | 'en';

export type Entry = { es: string; en: string };

/** Diccionario ES/EN de toda la UI. Fuente de verdad para textos traducibles. */
export const dict = {
	// Navbar
	'nav.editor': { es: 'Editor', en: 'Editor' },
	'nav.docs': { es: 'Docs', en: 'Docs' },
	'nav.ai': { es: 'Instrucciones IA', en: 'AI Instructions' },
	'nav.credits': { es: 'Créditos', en: 'Credits' },
	// Nombres accesibles del grupo segmentado de la navbar (data-i18n-aria)
	'nav.actions': { es: 'Acciones', en: 'Actions' },
	'nav.lang': { es: 'Cambiar idioma', en: 'Change language' },
	'nav.menu': { es: 'Menú', en: 'Menu' },

	// Footer
	'footer.os': {
		es: '100% Código abierto (GPL-3.0)',
		en: '100% Open Source (GPL-3.0)',
	},
	'footer.credits': { es: 'Créditos', en: 'Credits' },
	'footer.donate': { es: 'Donaciones', en: 'Donations' },
	'footer.repo': { es: 'Ver en GitHub', en: 'View on GitHub' },
	'footer.privacy': {
		es: 'Nada sale de tu navegador',
		en: 'Nothing leaves your browser',
	},
	'footer.privacy.hint': {
		es: 'Ver la política de privacidad',
		en: 'View the privacy policy',
	},

	// Privacidad (/privacy) — lenguaje llano, formato de preguntas y respuestas
	'privacy.title': { es: 'Privacidad', en: 'Privacy' },
	'privacy.lead': {
		es: 'Sin letra pequeña: esto es todo lo que hacemos (y no hacemos) con tus datos.',
		en: 'No fine print: this is everything we do (and do not do) with your data.',
	},
	'privacy.q1': {
		es: '¿Se sube mi CV a internet?',
		en: 'Is my CV uploaded to the internet?',
	},
	'privacy.a1': {
		es: 'No. Lo que escribas en esta web nunca sale de tu navegador. Esta web no tiene servidor: no hay a dónde subirlo.',
		en: 'No. Everything what you writes in this website stays in your browser. This website has no server: there is nowhere to upload it to.',
	},
	'privacy.a1b': {
		es: 'Si cierras la pestaña, tu CV sigue ahí: lo guarda tu propio navegador, en tu equipo. NO NOSOTROS',
		en: 'If you close the tab, your CV is still there: your own browser stores it, on your machine. NOT US',
	},
	'privacy.q2': { es: '¿Me estáis siguiendo?', en: 'Are you tracking me?' },
	'privacy.a2': {
		es: 'Esta web no tiene nada de cookies de seguimiento, analíticas, anuncios ni cuentas. No sabemos quién eres ni qué escribes, y no existe ningún registro que consultar.',
		en: 'This website has no tracking cookies, no analytics, no ads, no accounts. We do not know who you are or what you write, and there is no log to look into.',
	},
	'privacy.q3': {
		es: '¿Por qué tanta preocupación por la privacidad?',
		en: 'Why so much concern about privacy?',
	},
	'privacy.a3': {
		es: 'Un CV lleva datos personales: teléfono, correo, dirección, trayectoria… Merecen el mismo cuidado que si los tuvieras en papel.',
		en: 'A CV carries personal data: phone, email, address, work history… It deserves the same care as if you had it on paper.',
	},
	'privacy.a3b': {
		es: 'Y el código es público (GPL-3.0): cualquiera puede abrirlo y comprobar, línea a línea, que no se envía nada.',
		en: 'And the code is public (GPL-3.0): anyone can open it and verify, line by line, that nothing is sent.',
	},
	'privacy.q4': {
		es: '¿Que es lo único que SÍ sale a internet?',
		en: 'What goes TO internet then?',
	},
	'privacy.a4.1': {
		es: 'Al abrir usar web: quien la aloja (GitHub Pages) ve tu dirección IP, como en cualquier página. Pero nosotros nunca la vemos y nunca nos interesará',
		en: 'When you open this site: the host (GitHub Pages) sees your IP address, as with any site. But we never see you IP and will never do',
	},
	'privacy.q5': {
		es: '¿Y si quiero borrarlo todo?',
		en: 'And if I want to erase everything?',
	},
	'privacy.a5': {
		es: 'Pulsa «↺ Reiniciar» en el editor o borra los datos del sitio desde tu navegador.',
		en: 'Hit "↺ Reset" in the editor or clear the site data from your browser.',
	},
	'privacy.donate.title': { es: 'Una última cosa', en: 'One last thing' },
	'privacy.donate.body': {
		es: 'Si esto te ha servido, puedes invitarme a un café ☕. Es opcional: el editor es y seguirá siendo gratis.',
		en: 'If this was useful to you, you can buy me a coffee ☕. It is optional: the editor is and will stay free.',
	},

	// Landing (pantalla única)
	'landing.hero.title': {
		es: 'Tu CV en Markdown, con PDF al instante',
		en: 'Your CV in Markdown, instant PDF',
	},
	'landing.hero.sub': {
		es: 'Escribe a la izquierda y mira el PDF renderizarse a la derecha. Todo en tu navegador: sin servidores, sin cuentas y sin que nada salga de tu equipo.',
		en: 'Write on the left and watch the PDF render on the right. Everything happens in your browser: no servers, no accounts, nothing leaves your machine.',
	},
	'landing.cta': { es: 'Abrir el editor', en: 'Open the editor' },
	'landing.cta.ai': {
		es: '¿Tienes un CV antiguo? Pídele a una IA que lo convierta',
		en: 'Have an old CV? Have an AI convert it',
	},
	// Mock animado del hero (decorativo pero visible: también se traduce)
	'landing.mock.name': { es: '# Nombre', en: '# Name' },
	'landing.mock.title': {
		es: '- title: Diseñador de producto',
		en: '- title: Product designer',
	},
	'landing.mock.email': {
		es: '- Email: correo@ejemplo.com',
		en: '- Email: email@example.com',
	},
	'landing.mock.exp': { es: '## EXPERIENCIA', en: '## EXPERIENCE' },
	'landing.mock.company': {
		es: '### Empresa | Ciudad',
		en: '### Company | City',
	},
	'landing.mock.role': {
		es: '#### Rol | 2020 - Presente',
		en: '#### Role | 2020 - Present',
	},
	'landing.mock.win1': { es: '- Logro 1', en: '- Achievement 1' },
	'landing.mock.win2': { es: '- Logro 2', en: '- Achievement 2' },
	'landing.mock.sheetName': { es: 'Nombre', en: 'Name' },
	'landing.mock.sheetExp': { es: 'EXPERIENCIA', en: 'EXPERIENCE' },

	// Donaciones (modal del footer) — Ko-fi
	'donate.title': { es: 'Donaciones', en: 'Donations' },
	'donate.text': {
		es: 'Si este proyecto te resultó útil, puedes apoyarlo en Ko-fi. Es opcional y siempre gratis.',
		en: 'If you found this project useful, you can support it on Ko-fi. It is optional and always free.',
	},
	'donate.kofi': { es: 'Apoyar en Ko-fi', en: 'Support on Ko-fi' },
	'donate.note': {
		es: 'El editor seguirá siendo siempre gratuito.',
		en: 'The editor will always be free.',
	},

	// AI instructions
	'ai.title': { es: 'Instrucciones para IA', en: 'AI Instructions' },
	'ai.desc': {
		es: '¿Tienes tu CV en Word, PDF, LinkedIn o en texto? Copia este prompt y pégaselo a tu IA favorita junto con tu CV: te lo devolverá en el formato exacto que este editor entiende.',
		en: 'Is your CV in Word, PDF, LinkedIn or plain text? Copy this prompt and paste it into your favorite AI along with your CV: it will return it in the exact format this editor understands.',
	},
	'ai.copy': { es: 'Copiar prompt', en: 'Copy prompt' },
	'ai.copy.blocked': {
		es: 'Portapapeles bloqueado: texto seleccionado, pulsa Ctrl+C',
		en: 'Clipboard blocked — text selected, press Ctrl+C',
	},
	'ai.copied': { es: '✓ Copiado', en: '✓ Copied' },
	'ai.prompt.label': { es: 'Prompt', en: 'Prompt' },
	'ai.step.1': {
		es: 'Copia el prompt con el botón de abajo.',
		en: 'Copy the prompt with the button below.',
	},
	'ai.step.2': {
		es: 'Pégalo en tu IA junto con tu CV actual.',
		en: 'Paste it into your AI along with your current CV.',
	},
	'ai.step.3': {
		es: 'Copia el resultado y pégalo en el editor.',
		en: 'Copy the result and paste it into the editor.',
	},

	// Docs (página /docs)
	'docs.title': { es: 'Docs', en: 'Docs' },
	'docs.lead': {
		es: 'Especificación del formato Markdown que entiende el editor. La misma fuente se mantiene en docs/formato-cv.md del repositorio.',
		en: 'Specification of the Markdown format the editor understands. The same source lives at docs/formato-cv.md in the repository.',
	},
	'docs.raw': {
		es: 'Ver el archivo en GitHub ↗',
		en: 'View the file on GitHub ↗',
	},

	// Credits
	'credits.title': { es: 'Créditos', en: 'Credits' },
	'credits.lead': {
		es: 'Este proyecto es software libre. Aquí está quién lo construyó y de dónde viene.',
		en: 'This project is free software. Here is who built it and where it comes from.',
	},
	'credits.own.label': { es: 'Este proyecto', en: 'This project' },
	'credits.own.body': {
		es: 'cv-web es una reescritura en Astro + React, publicada bajo la misma licencia de software libre (bajo GPL-3.0) del proyecto y disponible en GitHub.',
		en: 'cv-web is an independent Astro + React rewrite, released as free software under GPL-3.0 and available on GitHub.',
	},
	'credits.own.repo': {
		es: 'Ver este repo en GitHub',
		en: 'View this repo on GitHub',
	},
	'credits.original.label': {
		es: 'Proyecto original',
		en: 'Original project',
	},
	// Fragmentos alrededor de los enlaces (data-i18n usa textContent, no HTML)
	'credits.body.before': {
		es: 'El motor de CV (parser markdown y render PDF) de este proyecto deriva de ',
		en: 'The CV engine (markdown parser and PDF renderer) of this project is derived from ',
	},
	'credits.body.mid': { es: ', creado por ', en: ', created by ' },
	'credits.body.after': {
		es: '. Todo el crédito original es suyo.',
		en: '. All original credit is theirs.',
	},
	'credits.repo': {
		es: 'Ver el repo original',
		en: 'View the original repo',
	},
	'credits.license.label': { es: 'Licencia', en: 'License' },
	'credits.license': {
		es: 'Licencia: GPL-3.0. Este proyecto es una reescritura independiente en Astro, publicada como software libre.',
		en: 'License: GPL-3.0. This project is an independent Astro rewrite, released as free software.',
	},

	// Editor toolbar (React)
	'tb.pdf': { es: '⤓ PDF', en: '⤓ PDF' },
	'tb.pdf.hint': {
		es: 'Descargar el CV en PDF',
		en: 'Download the CV as PDF',
	},
	'tb.pdf.error': {
		es: 'No se pudo generar el PDF',
		en: 'Could not generate the PDF',
	},
	'tb.pdf.done': { es: 'PDF descargado', en: 'PDF downloaded' },
	'tb.format': { es: '⌘ Autoformatear', en: '⌘ Format' },
	'tb.format.hint': {
		es: 'Normaliza el markdown sin perder contenido',
		en: 'Normalizes the markdown without losing content',
	},
	'tb.format.done': { es: 'Markdown formateado', en: 'Markdown formatted' },
	'tb.format.none': {
		es: 'El markdown ya está formateado',
		en: 'The markdown is already formatted',
	},
	'tb.format.invalid': {
		es: 'No se pudo formatear: revisa el markdown',
		en: 'Could not format: check the markdown',
	},
	'tb.format.loss': {
		es: 'Formateo cancelado: se habrían perdido líneas del CV',
		en: 'Formatting cancelled: some CV lines would have been lost',
	},
	'tb.down': { es: '↓ Markdown', en: '↓ Markdown' },
	'tb.down.hint': {
		es: 'Descargar el markdown tal cual está en el editor',
		en: 'Download the markdown exactly as in the editor',
	},
	'tb.down.done': { es: 'Archivo .md descargado', en: '.md file downloaded' },
	'tb.reset': { es: '↺ Reiniciar', en: '↺ Reset' },
	'tb.reset.title': { es: 'Restablecer el CV', en: 'Reset the CV' },
	'tb.reset.ok': { es: 'Restablecer', en: 'Reset' },
	'tb.reset.cancel': { es: 'Cancelar', en: 'Cancel' },
	'tb.reset.done': {
		es: 'CV de ejemplo restaurado',
		en: 'Sample CV restored',
	},
	'tb.reset.confirm': {
		es: '¿Restablecer al CV de ejemplo? Se perderán tus cambios locales.',
		en: 'Reset to the sample CV? Your local changes will be lost.',
	},
	'tb.status': { es: 'Guardado local', en: 'Local save' },
	'tb.status.hint': {
		es: 'Nada sale de tu navegador',
		en: 'Nothing leaves your browser',
	},
	'tb.empty': {
		es: 'Escribe un CV para ver la previsualización…',
		en: 'Write a CV to see the preview…',
	},

	// Workspace (split / pestañas móviles)
	'ws.tabs': { es: 'Vistas del editor', en: 'Editor views' },
	'ws.tab.md': { es: 'Markdown', en: 'Markdown' },
	'ws.tab.pdf': { es: 'PDF', en: 'PDF' },
	'ws.resize': { es: 'Redimensionar paneles', en: 'Resize panes' },

	// Prompt para IA
	'ai.prompt': {
		es: `INSTRUCCIONES DE USO
- Qué pegar: mi CV actual, tal cual (texto plano, exportado de Word/PDF, de LinkedIn...). No lo reordenes ni lo resumas.
- Qué recibirás: SOLO el markdown resultante, sin explicaciones ni comentarios, listo para pegarlo en el editor de cv-web.
- Entrega: todo en un solo bloque de texto en formato markdown, listo para copiar y pegar. Sin prefijos de idioma y sin nada antes o después.
- Si algún dato no aparece en mi CV, pregunta que poner. Nunca lo inventes.
- Si dudas con el formato, copia la estructura del EJEMPLO COMPLETO del final al pie de la letra.

FORMATO EXACTO
1. (Opcional) Frontmatter YAML entre dos líneas de tres guiones (---) con metadatos: title, year, tags.
2. Nombre como encabezado principal: # Nombre Apellido
3. Justo debajo, contacto como lista de "clave: valor" (una línea por dato):
   - title: <puesto o cargo>
   - Phone: <teléfono>            (también acepta "Teléfono")
   - Email: <correo>              (también acepta "Correo")
   - Location: <ciudad, país>     (también acepta "Ubicación" o "Ciudad")
   - LinkedIn: <url>
   - GitHub: <url>
   - Portafolio: <url>            (también acepta "Web")
   - Cualquier otra clave (p. ej. "Disponible: freelance") se conserva tal cual y se muestra en el PDF.
4. Cada sección con un encabezado de segundo nivel: ## TÍTULO DE SECCIÓN
   Si la sección debe empezar en una página nueva, añade " \\break" al final del título.
   "\\break" también vale al final de una entrada "###" para partir esa entrada en otra página.
5. Dentro de una sección puedes usar:
   - Párrafo normal (sin viñeta) en cualquier posición: justo después del "##" para el resumen, dentro de una entrada o después de una lista. Las líneas seguidas van juntas en el mismo párrafo.
   - Entrada principal: ### Empresa o título | Lugar   (la parte derecha va tras la barra "|").
   - Subentrada: #### Rol o periodo | Fecha
   - Detalles con viñeta: - logro o descripción   (también "*" o "+"; cada línea conserva su propio marcador)
   - Listas numeradas cuando el orden importe: 1. logro, 2. logro   (también "1)")
6. Enlaces y énfasis dentro de cualquier detalle o párrafo:
   - Enlace: [texto](url)   ·   Negrita: **texto**   ·   Cursiva: *texto**
   - Ejemplo: Implementé [el proyecto en GitHub](github.com/usuario/repo) con React y Node.js
   - Copia el énfasis y los enlaces tal como aparecen en mi original; no inventes negritas ni cursivas nuevas.
7. Orden recomendado de secciones cuando existan: RESUMEN PROFESIONAL, EXPERIENCIA PROFESIONAL, FORMACIÓN, HABILIDADES TÉCNICAS, IDIOMAS, PORTAFOLIO, CERTIFICACIONES.

RESPETO DEL ORIGINAL
- Respeta acentos, mayúsculas, puntuación, enlaces y énfasis (negrita/cursiva) tal como los escribo.
- No añadas nada fuera de este formato: sin introducción, sin cierre, sin notas ni explicaciones.

EJEMPLO COMPLETO — así debe quedar mi CV, con todos los elementos:
\`\`\`markdown
---
title: CV de Rick Sanchez
year: 2026
tags:
  - CV
  - Ejemplo
---
# Rick Sanchez
- title: Ingeniera de Software
- Teléfono: +34 600 111 222
- Correo: ana.ruiz@ejemplo.com
- Ubicación: Sevilla, España
- LinkedIn: linkedin.com/in/ana-ruiz
- GitHub: github.com/anaruiz
- Portafolio: anaruiz.dev
- Disponible: freelance y remoto

## RESUMEN PROFESIONAL
Ingeniera de software con seis años de experiencia en productos [SaaS de analítica](anaruiz.dev/proyecto). Trabajo con **TypeScript**, React y Node.js.

## EXPERIENCIA PROFESIONAL
### Nordata | Remoto \\break
#### Ingeniera Full-Stack Senior | 2022 - Presente
- Plataforma de analítica usada por más de 200 clientes
- Migración a servicios Node.js en AWS con [el código en GitHub](github.com/anaruiz/migracion)
- Pruebas end-to-end con Cypress: un 40% menos de regresiones

### Valleca Digital | Sevilla, España
#### Ingeniera Frontend | 2019 - 2022
- Librería de componentes interna usada por cinco productos

## FORMACIÓN
### Máster en Ingeniería de Software | Sevilla, España
#### Universidad de Ejemplo | 2017 - 2019
- Trabajo final sobre arquitecturas orientadas a eventos en tiempo real

## HABILIDADES TÉCNICAS
- Lenguajes: TypeScript, Python, SQL
- Frontend: React, Astro, CSS moderno
- Backend y nube: Node.js, PostgreSQL, Docker, AWS

## IDIOMAS
1. Español: nativo
2. Inglés: nivel profesional (C1)

## CERTIFICACIONES \\break
- AWS Certified Developer – Associate (2024)
- Certificación profesional de Scrum (2022)
\`\`\``,
		en: `HOW TO USE THIS PROMPT
- What to paste: my current CV as-is (plain text, exported from Word/PDF, from LinkedIn...). Do not reorder or summarize it.
- What you will get back: ONLY the resulting markdown, no explanations or comments, ready to paste into the cv-web editor.
- Deliver everything as a single markdown text block, ready to copy and paste. Do language prefixes, nothing before or after.
- If a piece of data is missing from my CV, leave it empty: never invent it.
- If you are unsure about the format, copy the structure of the FULL EXAMPLE at the end exactly.

EXACT FORMAT
1. (Optional) YAML frontmatter between two triple-dash (---) lines with metadata: title, year, tags.
2. Name as the main heading: # First Lastname
3. Right below, contact as "key: value" list items (one line per field):
   - title: <job title>
   - Phone: <phone>               (also accepts "Teléfono")
   - Email: <email>               (also accepts "Correo")
   - Location: <city, country>    (also accepts "Ubicación" or "Ciudad")
   - LinkedIn: <url>
   - GitHub: <url>
   - Portfolio: <url>             (also accepts "Web"; use this line for your site, projects or demos)
   - Any other key (e.g. "Available: freelance") is kept as-is and shown in the PDF.
4. Each section with a second-level heading: ## SECTION TITLE
   If the section must start on a new page, append " \\break" to the end of the title.
   "\\break" also works at the end of a "###" entry to start that entry on a new page.
5. Inside a section you can use:
   - A plain paragraph (no bullet) anywhere: right after the "##" for the summary, inside an entry or after a list. Consecutive lines belong to the same paragraph.
   - Main entry: ### Company or title | Place   (the right part goes after the "|").
   - Sub-entry: #### Role or period | Date
   - Details with a bullet: - achievement or description   (also "*" or "+"; every line keeps its own marker)
   - Numbered lists when order matters: 1. achievement, 2. achievement   (also "1)")
6. Links and emphasis inside any detail or paragraph:
   - Link: [text](url)   ·   Bold: **text**   ·   Italic: *text**
   - Example: I built [the project on GitHub](github.com/user/repo) with React and Node.js
   - Copy emphasis and links exactly as they appear in my original; do not invent new bold or italic.
7. Recommended section order when applicable: PROFESSIONAL SUMMARY, WORK EXPERIENCE, EDUCATION, TECHNICAL SKILLS, LANGUAGES, PORTFOLIO, CERTIFICATIONS.

RESPECT FOR THE ORIGINAL
- Keep accents, capitalization, punctuation, links and emphasis (bold/italic) exactly as I write them.
- Add nothing outside this format: no intro, no outro, no notes or explanations.

FULL EXAMPLE — this is exactly how my CV must look, with every element:
\`\`\`markdown
---
title: Rick Sanchez CV
year: 2026
tags:
  - CV
  - Example
---
# Rick Sanchez 
- title: Software Engineer
- Phone: +34 600 111 222
- Email: ana.ruiz@example.com
- Location: Seville, Spain
- LinkedIn: linkedin.com/in/ana-ruiz
- GitHub: github.com/anaruiz
- Portfolio: anaruiz.dev
- Available: freelance and remote

## PROFESSIONAL SUMMARY
Software engineer with six years of experience building [analytics SaaS products](anaruiz.dev/project). I work with **TypeScript**, React and Node.js.

## WORK EXPERIENCE
### Nordata | Remote \\break
#### Senior Full-Stack Engineer | 2022 - Present
- Analytics platform serving 200+ customers
- Migration to Node.js services on AWS with [the code on GitHub](github.com/anaruiz/migration)
- End-to-end testing with Cypress: 40% fewer regressions

### Valleca Digital | Seville, Spain
#### Frontend Engineer | 2019 - 2022
- In-house component library used by five products

## EDUCATION
### Master in Software Engineering | Seville, Spain
#### Example University | 2017 - 2019
- Final thesis on real-time event-driven architectures

## TECHNICAL SKILLS
- Languages: TypeScript, Python, SQL
- Frontend: React, Astro, modern CSS
- Backend and cloud: Node.js, PostgreSQL, Docker, AWS

## LANGUAGES
1. Spanish: native
2. English: professional working proficiency (C1)

## CERTIFICATIONS \\break
- AWS Certified Developer – Associate (2024)
- Professional Scrum certification (2022)
\`\`\``,
	},
} satisfies Record<string, Entry>;

/** Claves válidas: `t('tb.pdf', lang)` compila; `t('tb.existe', lang)` no. */
export type DictKey = keyof typeof dict;

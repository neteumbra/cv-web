export type Lang = 'es' | 'en';

export type Entry = { es: string; en: string };

/** Diccionario ES/EN de toda la UI. Fuente de verdad para textos traducibles. */
export const dict = {
	// Meta del documento (título de pestaña y description) — se renderiza en el
	// HTML del build para el idioma de la ruta. La description es POR PÁGINA:
	// una sola global mataba el CTR de /credits y /privacy en los resultados.
	'meta.title.landing': {
		es: 'Crear CV ATS gratis — editor Markdown con PDF | cv-web',
		en: 'Free ATS Resume Builder — Markdown Editor with PDF | cv-web',
	},
	'meta.title.editor': {
		es: 'Editor de CV ATS — escribe y mira el PDF | cv-web',
		en: 'ATS Resume Editor — write and watch the PDF | cv-web',
	},
	'meta.title.ai': {
		es: 'Convertir un CV antiguo a formato ATS con IA | cv-web',
		en: 'Turn an old CV into an ATS format with AI | cv-web',
	},
	'meta.title.docs': {
		es: 'Formato del CV (Markdown) — especificación | cv-web',
		en: 'CV format (Markdown) — specification | cv-web',
	},
	'meta.title.credits': { es: 'Créditos y licencia — cv-web', en: 'Credits and license — cv-web' },
	'meta.title.privacy': {
		es: 'Privacidad: tu CV no sale de tu navegador | cv-web',
		en: 'Privacy: your CV never leaves your browser | cv-web',
	},
	'meta.title.404': { es: 'Página no encontrada — cv-web', en: 'Page not found — cv-web' },
	'notfound.title': { es: 'Página no encontrada', en: 'Page not found' },
	'notfound.lead': {
		es: 'Esta URL no existe. Puede que la hayas escrito a mano o que un enlace viejo te haya traído hasta aquí.',
		en: 'This URL does not exist. You may have typed it, or an old link brought you here.',
	},
	'notfound.home': { es: 'Volver al inicio', en: 'Back to home' },
	'meta.desc.404': {
		es: 'Página no encontrada.',
		en: 'Page not found.',
	},
	'meta.desc.landing': {
		es: 'Crea tu CV ATS gratis: escribes en Markdown y descargas un PDF de una sola columna y texto seleccionable, el formato que los sistemas de selección leen mejor. Sin cuenta y sin subirlo a ningún servidor.',
		en: 'Build a free ATS-friendly CV: write in Markdown and download a single-column PDF with selectable text, the format automated screeners read best. No account, nothing uploaded.',
	},
	'meta.desc.editor': {
		es: 'Editor de CV en Markdown con el PDF renderizándose en vivo. Se guarda en tu navegador y el PDF se genera en tu equipo.',
		en: 'Markdown CV editor with the PDF rendering live. Saved in your browser, PDF built on your machine.',
	},
	'meta.desc.ai': {
		es: 'Pega tu CV de Word, PDF o LinkedIn en cualquier IA y recibe el markdown exacto que este editor entiende, listo para pegar.',
		en: 'Paste your Word, PDF or LinkedIn CV into any AI and get the exact markdown this editor understands, ready to paste.',
	},
	'meta.desc.docs': {
		es: 'Especificación del formato Markdown del CV: secciones, entradas, fechas, listas, negrita y \\break para paginar.',
		en: 'Specification of the CV Markdown format: sections, entries, dates, lists, bold and \\break for page breaks.',
	},
	'meta.desc.credits': {
		es: 'cv-web es software libre bajo GPL-3.0. El motor deriva de xthecapx/cv-generator, con todo el crédito original intacto.',
		en: 'cv-web is free software under GPL-3.0. The engine is derived from xthecapx/cv-generator, all original credit intact.',
	},
	'meta.desc.privacy': {
		es: 'Tu CV no sale de tu navegador: sin cuentas, sin cookies de rastreo, sin analíticas y sin servidores donde se guarde nada.',
		en: 'Your CV never leaves your browser: no accounts, no tracking cookies, no analytics, no servers storing anything.',
	},

	// Navbar
	'nav.editor': { es: 'Editor', en: 'Editor' },
	'nav.docs': { es: 'Docs', en: 'Docs' },
	'nav.ai': { es: 'Instrucciones IA', en: 'AI Instructions' },
	'nav.credits': { es: 'Créditos', en: 'Credits' },
	// Nombres accesibles del grupo segmentado de la navbar
	'nav.actions': { es: 'Acciones', en: 'Actions' },
	'nav.menu': { es: 'Menú', en: 'Menu' },

	// Footer
	'footer.credits': { es: 'Créditos', en: 'Credits' },
	'footer.repo': { es: 'Ver en GitHub', en: 'View on GitHub' },
	'footer.privacy': {
		es: 'Nada sale de tu navegador',
		en: 'Nothing leaves your browser',
	},
	'footer.privacy.hint': {
		es: 'Ver la política de privacidad',
		en: 'View the privacy policy',
	},

	// Privacidad (/privacy) — lenguaje llano, formato de preguntas y respuestas.
	// Orden pensado para leerse entero en 30 segundos: primero la respuesta
	// corta (privacy.summary.*), después las preguntas de arriba abajo.
	'privacy.title': { es: 'Privacidad', en: 'Privacy' },
	'privacy.lead': {
		es: 'Un CV es dato personal: teléfono, correo, dirección, trayectoria. Aquí te explicamos, sin rodeos, exactamente qué ocurre con el tuyo.',
		en: 'A CV is personal data: phone, email, address, work history. Here is, in plain words, exactly what happens to yours.',
	},
	'privacy.summary.title': { es: 'La respuesta corta', en: 'The short answer' },
	'privacy.summary.body': {
		es: 'Tu CV nunca sale de tu navegador. No hay cuentas, ni cookies de rastreo, ni analíticas, ni servidores donde se guarde nada: escribes en tu equipo y el PDF se genera en tu equipo.',
		en: 'Your CV never leaves your browser. No accounts, no tracking cookies, no analytics, no servers storing anything: you type on your machine and the PDF is built on your machine.',
	},
	'privacy.q1': {
		es: '¿Se sube mi CV a algún servidor?',
		en: 'Is my CV uploaded to any server?',
	},
	'privacy.a1': {
		es: 'No. Esta web no tiene servidor propio al que subirlo: el markdown que escribes y el PDF que se genera se quedan en tu navegador.',
		en: 'No. This site has no server of its own to upload it to: the markdown you write and the PDF it builds stay in your browser.',
	},
	'privacy.a1b': {
		es: 'Puedes desconectarte de internet con la página abierta y seguir trabajando sin más: el editor no necesita red.',
		en: 'You can go offline with the page open and keep working: the editor does not need the network.',
	},
	'privacy.q2': {
		es: '¿Dónde se guarda entonces?',
		en: 'Where is it stored, then?',
	},
	'privacy.a2': {
		es: 'En el almacenamiento local de tu navegador, en este mismo equipo. Es lo mismo que hace cualquier editor local: el dato se queda donde lo estás escribiendo.',
		en: 'In your browser’s local storage, on this same machine. Same as any local editor: the data stays where you are typing it.',
	},
	'privacy.a2b': {
		es: 'Ese espacio sólo lo escribe y lee esta web desde tu navegador. Si lo borras, se acabó: no hay copia en ningún otro sitio.',
		en: 'Only this site reads and writes that space, through your browser. If you clear it, it is gone: there is no copy anywhere else.',
	},
	'privacy.q3': {
		es: '¿Usáis cookies, rastreadores o analíticas?',
		en: 'Do you use cookies, trackers or analytics?',
	},
	'privacy.a3': {
		es: 'Ninguna. Cero cookies de terceros, cero scripts de medición, cero anuncios y cero cuentas de usuario. No es que guardemos poco: no existen métricas de uso porque nunca se recogieron.',
		en: 'None. Zero third-party cookies, zero measuring scripts, zero ads, zero user accounts. It is not that we keep little: usage metrics do not exist because they were never collected.',
	},
	'privacy.q4': {
		es: '¿Entonces no sabéis quién soy?',
		en: 'So you do not know who I am?',
	},
	'privacy.a4': {
		es: 'Nada de nada. El código entero está público en GitHub: puedes abrirlo y comprobar, línea a línea, que no se envía ninguna petición a ningún sitio.',
		en: 'Nothing at all. The whole code is public on GitHub: you can open it and check, line by line, that no request is sent anywhere.',
	},
	'privacy.q5': {
		es: '¿Y qué ve el que aloja la web?',
		en: 'And what does the host see?',
	},
	'privacy.a5': {
		es: 'GitHub Pages, al servir la página, ve tu dirección IP: lo mismo que cualquier sitio que visites. Esa IP llega a su servidor, no al nuestro, y no hay ningún registro nuestro que consultar.',
		en: 'GitHub Pages sees your IP address when serving the page, like any site you visit. That IP reaches their server, not ours, and there is no log of ours to look into.',
	},
	'privacy.q6': {
		es: '¿Cómo borro todo?',
		en: 'How do I erase everything?',
	},
	'privacy.a6': {
		es: 'Pulsa «↺ Reiniciar» en la barra del editor para volver al CV de ejemplo, o borra los datos del sitio desde los ajustes de tu navegador.',
		en: 'Hit "↺ Reset" in the editor toolbar to go back to the sample CV, or clear the site data from your browser settings.',
	},
	'privacy.a6b': {
		es: 'No queda nada pendiente en ningún otro sitio, porque nunca salió de tu equipo.',
		en: 'Nothing is pending anywhere else, because it never left your machine.',
	},
	'privacy.donate.title': { es: '¿Te ha servido?', en: 'Did this help you?' },
	'privacy.donate.body': {
		es: 'El editor es gratuito, sin anuncios y sin planes de pago, y no vende tus datos a nadie (no hay datos que vender). Si te ha servido, invítame a un café ☕ para que siga vivo.',
		en: 'The editor is free, with no ads and no paid plans, and it does not sell your data to anyone (there is no data to sell). If it helped you, buy me a coffee ☕ to keep it alive.',
	},

	// Landing (pantalla única) — keyword principal ES: «crear CV ATS»;
	// EN: «ATS resume builder». El claim es comprobable (ver landing.ats.*).
	'landing.hero.title': {
		es: 'Crea tu CV ATS en Markdown y descarga el PDF al instante',
		en: 'Build your ATS resume in Markdown, download the PDF instantly',
	},
	'landing.hero.sub': {
		es: 'Escribe a la izquierda y mira el PDF renderizarse a la derecha. Sale un documento de una sola columna y texto seleccionable: el formato que los sistemas de selección automática leen sin ruido. Todo en tu navegador, sin cuenta y sin subirlo a ningún servidor.',
		en: 'Write on the left and watch the PDF render on the right. You get a single-column document with selectable text: the format automated screeners read without noise. Everything in your browser, no account, nothing uploaded.',
	},
	'landing.cta': { es: 'Empezar mi CV', en: 'Start my CV' },
	'landing.badge': { es: 'Software libre · Sin registros', en: 'Free software · No sign-up' },
	'landing.cta.ai': {
		es: '¿Tienes un CV antiguo? Pídele a una IA que lo convierta',
		en: 'Have an old CV? Have an AI convert it',
	},

	// Bloque "por qué este formato" — honestidad primero: no certificamos
	// ningún ATS concreto; explicamos las decisiones de formato que sí controlamos.
	'landing.ats.title': { es: 'Por qué este formato le sienta bien a un ATS', en: 'Why this format works well for an ATS' },
	'landing.ats.note': {
		es: 'No certificamos compatibilidad con ningún ATS concreto: nadie puede prometer eso de forma honesta. Lo que sí hacemos es cada decisión de formato que los lectores automáticos agradecen, y te la explicamos aquí.',
		en: 'We do not certify compatibility with any specific ATS: nobody can honestly promise that. What we do is every formatting decision that automated readers like, and we explain each one here.',
	},
	'landing.ats.1.title': { es: 'Texto real, seleccionable', en: 'Real, selectable text' },
	'landing.ats.1.body': {
		es: 'El PDF se genera con texto, no con una imagen de la página: se puede seleccionar, copiar y buscar. Un extractor automático lee el contenido en lugar de adivinarlo.',
		en: 'The PDF is built from text, not from a picture of the page: it can be selected, copied and searched. An automated extractor reads the content instead of guessing it.',
	},
	'landing.ats.2.title': { es: 'Una sola columna', en: 'A single column' },
	'landing.ats.2.body': {
		es: 'Sin tablas, cajas ni dos columnas: cada dato va en su línea, en el orden en que se lee. Nada de que el extractor lea «nombre» y «teléfono» pegados.',
		en: 'No tables, boxes or two columns: every field on its own line, in reading order. No extractor reading your name and phone number jammed together.',
	},
	'landing.ats.3.title': { es: 'Encabezados y fechas estándar', en: 'Standard headings and dates' },
	'landing.ats.3.body': {
		es: 'Secciones con títulos reconocibles (EXPERIENCIA, FORMACIÓN, HABILIDADES) y fechas en un formato legible, para que la clasificación acierte más a la primera.',
		en: 'Sections with recognizable headings (EXPERIENCE, EDUCATION, SKILLS) and dates in a readable format, so classification lands right the first time.',
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

	// Donaciones (botón de Ko-fi en /credits y /privacy)
	'donate.kofi': { es: 'Apoyar en Ko-fi', en: 'Support on Ko-fi' },

	// AI instructions
	'ai.title': { es: 'Instrucciones para IA', en: 'AI Instructions' },
	'ai.desc': {
		es: 'Convierte cualquier CV (Word, PDF, LinkedIn o texto plano) al formato exacto que este editor entiende.',
		en: 'Turn any CV (Word, PDF, LinkedIn or plain text) into the exact format this editor understands.',
	},
	'ai.copy': { es: 'Copiar prompt', en: 'Copy prompt' },
	'ai.copy.blocked': {
		es: 'Portapapeles bloqueado: texto seleccionado, pulsa Ctrl+C',
		en: 'Clipboard blocked — text selected, press Ctrl+C',
	},
	'ai.copied': { es: '✓ Copiado', en: '✓ Copied' },
	'ai.prompt.label': { es: 'Prompt', en: 'Prompt' },
	'ai.step.1': {
		es: 'Copia el prompt de abajo.',
		en: 'Copy the prompt below.',
	},
	'ai.step.2': {
		es: 'Pégalo en tu IA junto con tu CV actual.',
		en: 'Paste it into your AI along with your current CV.',
	},
	'ai.step.3': {
		es: 'Pega el resultado en el editor.',
		en: 'Paste the result into the editor.',
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
	'credits.badge': {
		es: 'Software libre · GPL-3.0',
		en: 'Free software · GPL-3.0',
	},
	'credits.lead': {
		es: 'cv-web es software libre: se puede leer, usar y modificar sin pedirle permiso a nadie. Esto es de dónde viene y quién lo hizo.',
		en: 'cv-web is free software: you can read, use and modify it without asking anyone. Here is where it comes from and who made it.',
	},
	'credits.own.label': { es: 'Este proyecto', en: 'This project' },
	'credits.own.body': {
		es: 'Editor de CV en Markdown con el PDF renderizándose en vivo, escrito en Astro y React. Sin servidor, sin cuentas y sin seguimiento: escribes en tu navegador y el PDF se genera ahí mismo.',
		en: 'A Markdown CV editor with the PDF rendering live, written in Astro and React. No server, no accounts, no tracking: you type in your browser and the PDF is built right there.',
	},
	'credits.own.repo': {
		es: 'Ver el código en GitHub',
		en: 'View the code on GitHub',
	},
	'credits.original.label': {
		es: 'El motor, y de dónde viene',
		en: 'The engine, and where it comes from',
	},
	// Fragmentos alrededor de los enlaces del proyecto original (el texto se
	// compone en la propia plantilla: son varios enlaces dentro de un párrafo)
	'credits.body.before': {
		es: 'El motor de CV (el parser de markdown y el renderizador del PDF) de este proyecto deriva de ',
		en: 'The CV engine (the markdown parser and the PDF renderer) of this project is derived from ',
	},
	'credits.body.mid': { es: ', creado por ', en: ', created by ' },
	'credits.body.after': {
		es: '. Todo el crédito original es suyo.',
		en: '. All of the original credit is theirs.',
	},
	'credits.repo': {
		es: 'Ver el proyecto original',
		en: 'View the original project',
	},
	'credits.license.label': { es: 'Licencia', en: 'License' },
	'credits.license': {
		es: 'GPL-3.0. Puedes usarlo, copiarlo, modificarlo y redistribuirlo, siempre que mantengas la misma licencia y no borres los créditos.',
		en: 'GPL-3.0. You may use, copy, modify and redistribute it, as long as you keep the same license and keep the credits.',
	},
	'credits.support.label': { es: '¿Te ha servido?', en: 'Did this help you?' },
	'credits.support.body': {
		es: 'No hay anuncios, ni cuentas de pago, ni funciones tras una suscripción: sólo este editor, y es gratis. Si te ha servido, puedes invítame a un café ☕.',
		en: 'No ads, no paid accounts, no features behind a subscription: just this editor, and it is free. If it helped you, you can buy me a coffee ☕.',
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

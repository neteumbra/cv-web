export type Lang = 'es' | 'en';

type Entry = { es: string; en: string };

/** Diccionario ES/EN de toda la UI. Fuente de verdad para textos traducibles. */
export const dict: Record<string, Entry> = {
  // Navbar
  'nav.home': { es: 'Inicio', en: 'Home' },
  'nav.editor': { es: 'Editor', en: 'Editor' },
  'nav.ai': { es: 'Instrucciones IA', en: 'AI Instructions' },
  'nav.credits': { es: 'Créditos', en: 'Credits' },
  'nav.donate': { es: 'Donar', en: 'Donate' },

  // Footer
  'footer.os': { es: '100% Código abierto (GPL-3.0)', en: '100% Open Source (GPL-3.0)' },
  'footer.credits': { es: 'Créditos', en: 'Credits' },
  'footer.donate': { es: 'Donaciones', en: 'Donations' },
  'footer.repo': { es: 'Ver en GitHub', en: 'View on GitHub' },
  'footer.built': { es: 'Hecho con Astro', en: 'Built with Astro' },

  // Landing
  'landing.hero.title': { es: 'Tu CV en Markdown, con PDF al instante', en: 'Your CV in Markdown, instant PDF' },
  'landing.hero.sub': {
    es: 'Escribe tu CV en markdown a la izquierda y mira el PDF renderizándose en tiempo real a la derecha. Todo ocurre en tu navegador: sin servidores, sin base de datos, sin que nada salga de tu equipo.',
    en: 'Write your CV in markdown on the left and watch the PDF render in real time on the right. Everything happens in your browser: no servers, no database, nothing leaves your machine.',
  },
  'landing.cta': { es: 'Abrir el editor', en: 'Open the editor' },
  'landing.cta.ai': { es: '¿Tienes un CV antiguo? Pídele a una IA que lo convierta', en: 'Have an old CV? Have an AI convert it' },
  'landing.why.title': { es: '¿Por qué?', en: 'Why?' },
  'landing.why.text': {
    es: 'Tu CV es texto plano: vive en un archivo .md que puedes versionar, copiar y llevar contigo. El formato es el mismo que usa el plugin de Obsidian de este proyecto, así que puedes editar donde te venga mejor y siempre obtienes el mismo PDF limpio.',
    en: 'Your CV is plain text: it lives in a .md file you can version, copy and carry with you. The format matches the Obsidian plugin of this project, so you can edit wherever you like and always get the same clean PDF.',
  },
  'landing.how.title': { es: 'Cómo usarlo', en: 'How to use it' },
  'landing.how.1': { es: 'Pulsa "Abrir el editor".', en: 'Click "Open the editor".' },
  'landing.how.2': { es: 'Escribe tu CV en markdown a la izquierda; el PDF se actualiza solo.', en: 'Write your CV in markdown on the left; the PDF updates itself.' },
  'landing.how.3': { es: 'Pulsa "⤓ PDF" para descargarlo al instante.', en: 'Click "⤓ PDF" to download it instantly.' },
  'landing.how.4': { es: 'Se guarda solo en tu navegador. Nada se sube a internet.', en: 'It saves itself in your browser. Nothing is uploaded.' },
  'landing.features.title': { es: 'Características', en: 'Features' },
  'landing.features.1': { es: 'Previsualización PDF en vivo (WYSIWYG)', en: 'Live PDF preview (WYSIWYG)' },
  'landing.features.2': { es: 'Descarga de PDF al instante', en: 'Instant PDF download' },
  'landing.features.3': { es: 'Compatible con español e inglés', en: 'Spanish and English compatible' },
  'landing.features.4': { es: 'Importar / exportar .md', en: 'Import / export .md' },
  'landing.features.5': { es: 'Guardado local automático', en: 'Automatic local save' },
  'landing.features.6': { es: '100% open source (GPL-3.0)', en: '100% open source (GPL-3.0)' },
  'landing.donate.title': { es: 'Donaciones', en: 'Donations' },
  'landing.donate.text': {
    es: 'Si este proyecto te resultó útil, puedes apoyarlo. Es opcional y siempre gratis.',
    en: 'If you found this project useful, you can support it. It is optional and always free.',
  },
  'landing.donate.sponsors': { es: 'GitHub Sponsors', en: 'GitHub Sponsors' },
  'landing.donate.buymeacoffee': { es: 'Buy Me a Coffee', en: 'Buy Me a Coffee' },

  // AI instructions
  'ai.title': { es: 'Instrucciones para IA', en: 'AI Instructions' },
  'ai.desc': {
    es: '¿Tienes tu CV en Word, PDF, LinkedIn o en texto? Copia este prompt y pégaselo a tu IA favorita junto con tu CV: te lo devolverá en el formato exacto que este editor entiende.',
    en: 'Is your CV in Word, PDF, LinkedIn or plain text? Copy this prompt and paste it into your favorite AI along with your CV: it will return it in the exact format this editor understands.',
  },
  'ai.copy': { es: 'Copiar prompt', en: 'Copy prompt' },
  'ai.copied': { es: '¡Copiado!', en: 'Copied!' },

  // Credits
  'credits.title': { es: 'Créditos', en: 'Credits' },
  'credits.body': {
    es: 'El motor de CV (parser markdown y render PDF) de este proyecto deriva de xthecapx/cv-generator, creado por Cristian Daniel Márquez Barrios (xthecapx). Todo el crédito original es suyo.',
    en: 'The CV engine (markdown parser and PDF renderer) of this project is derived from xthecapx/cv-generator, created by Cristian Daniel Márquez Barrios (xthecapx). All original credit is theirs.',
  },
  'credits.repo': { es: 'Ver el repo original', en: 'View the original repo' },
  'credits.license': {
    es: 'Licencia: GPL-3.0. Este proyecto es una reescritura independiente en Astro, publicada como software libre.',
    en: 'License: GPL-3.0. This project is an independent Astro rewrite, released as free software.',
  },

  // Editor toolbar (React)
  'tb.pdf': { es: '⤓ PDF', en: '⤓ PDF' },
  'tb.down': { es: '↓ Markdown', en: '↓ Markdown' },
  'tb.up': { es: '↑ Markdown', en: '↑ Markdown' },
  'tb.reset': { es: '↺ Reiniciar', en: '↺ Reset' },
  'tb.reset.confirm': {
    es: '¿Restablecer al CV de ejemplo? Se perderán tus cambios locales.',
    en: 'Reset to the sample CV? Your local changes will be lost.',
  },
  'tb.status': {
    es: '● Guardado local · nada sale de tu navegador',
    en: '● Local save · nothing leaves your browser',
  },
  'tb.empty': { es: 'Escribe un CV para ver la previsualización…', en: 'Write a CV to see the preview…' },

  // Prompt para IA
  'ai.prompt': {
    es: `Eres un asistente que convierte un CV a un formato markdown exacto. Te pegaré mi CV actual (en cualquier formato: texto, Word, PDF, LinkedIn...). Devuélvelo SOLO como markdown, sin explicaciones ni texto adicional, siguiendo estas reglas:

1. (Opcional) Frontmatter YAML entre dos líneas de tres guiones (---) con metadatos: title, year, tags.
2. Nombre como encabezado principal: # Nombre Apellido
3. Justo debajo, contacto como lista de "clave: valor":
   - title: <puesto>
   - Phone: <teléfono>
   - Email: <correo>
   - Location: <ciudad, país>   (también acepta "Ubicación")
   - LinkedIn: <url>
   - GitHub: <url>
4. Cada sección con un encabezado de segundo nivel: ## TÍTULO DE SECCIÓN
   Si la sección debe empezar en una página nueva, añade " \break" al final del título.
5. Dentro de una sección puedes usar:
   - Un párrafo normal (sin viñeta) justo después del "##" para un resumen.
   - Entrada principal: ### Empresa o título | Lugar   (la parte derecha va tras la barra "|").
   - Subentrada: #### Rol o periodo | Fecha
   - Detalles con viñeta: - logro o descripción
6. Los enlaces se escriben como [texto](url) dentro de cualquier detalle.

Respeta los acentos y las mayúsculas tal como los escribo. No añadas nada fuera de este formato. Si falta algún dato, déjalo vacío.`,
    en: `You are an assistant that converts a CV into an exact markdown format. I will paste my current CV (in any format: plain text, Word, PDF, LinkedIn...). Return it ONLY as markdown, with no explanations or extra text, following these rules:

1. (Optional) YAML frontmatter between two triple-dash (---) lines with metadata: title, year, tags.
2. Name as the main heading: # First Lastname
3. Right below, contact as "key: value" list items:
   - title: <job title>
   - Phone: <phone>
   - Email: <email>
   - Location: <city, country>   (also accepts "Ubicación")
   - LinkedIn: <url>
   - GitHub: <url>
4. Each section with a second-level heading: ## SECTION TITLE
   If the section must start on a new page, append " \break" to the end of the title.
5. Inside a section you can use:
   - A plain paragraph (no bullet) right after the "##" for a summary.
   - Main entry: ### Company or title | Place   (the right part goes after the "|").
   - Sub-entry: #### Role or period | Date
   - Details with a bullet: - achievement or description
6. Links are written as [text](url) inside any detail.

Keep accents and capitalization exactly as I write them. Add nothing outside this format. If a field is missing, leave it empty.`,
  },
};

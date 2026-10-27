/**
 * Conversión markdown <-> CvData (parser del CV).
 *
 * Derivado de: xthecapx/cv-generator (apps/components/src/utils/cvConverter.ts)
 * Copyright (c) xthecapx — Licensed under GPL-3.0 (ver /LICENSE)
 */
import { parse } from 'yaml';
import type { ContactInfo, CvData, CvItem, CvProperties, CvSection } from "./types";


export const CV_STORAGE_KEY = 'cvData';

export function parseYamlFrontmatter(markdown: string): { properties: CvProperties, content: string } {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = markdown.match(frontmatterRegex);

  if (!match) {
    return { properties: {}, content: markdown };
  }

  const [, frontmatter, content] = match;
  
  try {
    const properties = parse(frontmatter) as CvProperties;
    return { 
      properties: properties || {}, 
      content: content.trim() 
    };
  } catch (error) {
    console.error('Error parsing frontmatter:', error);
    return { properties: {}, content: markdown };
  }
}

/**
 * Claves de contacto que se pintan como enlace en la cabecera del PDF
 * (se comparan en minúsculas y sin acentos vía normalizeContactKey).
 */
const LINK_CONTACT_KEYS = [
  'linkedin',
  'github',
  'portfolio',
  'portafolio',
  'web',
  'website',
  'sitio',
  'pagina web',
  'blog',
  'twitter',
  'x',
  'instagram',
  'behance',
  'dribbble',
  'medium',
  'devto',
];

/**
 * Lowercase + strip accents so contact keys are matched leniently:
 * "Teléfono" -> "telefono", "Correo" -> "correo", "Phone" -> "phone".
 */
function normalizeContactKey(key: string): string {
  return key
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

/**
 * Prefijo de línea de lista: viñeta (`-`, `*`, `+`) o numeración (`1.`, `2)`…),
 * siempre con al menos un espacio detrás (igual que Markdown: `-foo` es texto).
 */
const LIST_MARKER = /^([-*+]|\d{1,3}[.)])\s+/;

/** El marcador de la línea si es una línea de lista; si no, `undefined`. */
function listMarker(line: string): string | undefined {
  return line.match(LIST_MARKER)?.[1];
}

/** Texto de la línea de lista sin su marcador. */
function listText(line: string): string {
  return line.replace(LIST_MARKER, '');
}

export function markdownToCv(markdown: string): CvData {
  const { properties, content } = parseYamlFrontmatter(markdown);
  const lines = content.split('\n').filter(line => line.trim());
  const cv: CvData = {
    properties: Object.keys(properties).length > 0 ? properties : undefined,
    contact: {
      name: '',
      title: '',
      phone: '',
      email: '',
      location: '',
      links: [],
      other: []
    },
    sections: []
  };

  let currentSection: CvSection | null = null;
  let currentItem: CvItem | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.startsWith('# ')) {
      cv.contact.name = line.slice(2);

      // La lista de contacto puede venir sangrada o con viñetas "*".
      while (i + 1 < lines.length && listMarker(lines[i + 1].trim())) {
        i++;
        // Separamos en el PRIMERO ": " para no romper valores que contengan dos puntos.
        const raw = listText(lines[i].trim());
        const sep = raw.indexOf(': ');
        // "- Clave:" (sin espacio final) no debe reescribirse como "- Clave::"
        const key = sep >= 0 ? raw.slice(0, sep) : raw.endsWith(':') ? raw.slice(0, -1).trimEnd() : raw;
        const value = sep >= 0 ? raw.slice(sep + 2) : '';
        const k = normalizeContactKey(key);
        if (k === 'title' || k === 'puesto' || k === 'cargo') {
          cv.contact.title = value;
        } else if (['phone', 'telefono', 'tel', 'movil', 'telefono movil'].includes(k)) {
          cv.contact.phone = value;
          cv.contact.phoneLabel = key;
        } else if (['location', 'ubicacion', 'ciudad', 'direccion', 'city', 'pais'].includes(k)) {
          cv.contact.location = value;
          cv.contact.locationLabel = key;
        } else if (['email', 'correo', 'mail'].includes(k)) {
          cv.contact.email = value;
          cv.contact.emailLabel = key;
        } else if (LINK_CONTACT_KEYS.includes(k)) {
          // LinkedIn, GitHub, Portafolio, Web... se pintan como enlace en la cabecera.
          cv.contact.links.push({ text: key, url: value });
        } else if (key) {
          // Cualquier otra clave se conserva (el formateo debe devolverla tal cual).
          cv.contact.other.push({ key, value });
        }
      }
      continue;
    }

    if (line.startsWith('## ')) {
      const title = line.slice(3);
      currentSection = {
        title: title.replace('\\break', '').trim(),
        items: [],
        break: title.includes('\\break'),
      };
      cv.sections.push(currentSection);
      currentItem = null;
      continue;
    }

    // Contenido antes del primer `##` (resumen suelto, listas…): no hay dónde
    // enmarcarlo, así que abre una sección sin título (el PDF no pinta
    // cabecera y `cvToMarkdown` no escribe el `##`).
    if (!currentSection) {
      currentSection = { title: '', items: [], preamble: true };
      cv.sections.push(currentSection);
      currentItem = null;
    }

    if (line.startsWith('### ')) {
      const headerLine = line.slice(4);
      const hasBreak = headerLine.endsWith('\\break');
      const cleanHeader = hasBreak ? headerLine.slice(0, -6).trim() : headerLine;
      const [primary, primaryRight] = cleanHeader.split(' | ');
      currentItem = { primary, primaryRight, details: [], break: hasBreak };
      currentSection.items.push(currentItem);
      continue;
    }

    if (line.startsWith('#### ')) {
      // `####` sin `###` previo: la entrada se abre aquí mismo.
      if (!currentItem) {
        currentItem = { details: [] };
        currentSection.items.push(currentItem);
      }
      const [secondary, secondaryRight] = line.slice(5).split(' | ');
      currentItem.secondary = secondary;
      currentItem.secondaryRight = secondaryRight;
      continue;
    }

    const marker = listMarker(line);
    if (marker) {
      // Una viñeta nunca se cuela en un párrafo: si el item vigente es texto
      // plano, la lista abre su propia entrada (antes el `- ` se tragaba y el
      // formateo perdía la viñeta).
      if (!currentItem || currentItem.plain) {
        currentItem = { details: [] };
        currentSection.items.push(currentItem);
      }
      currentItem.details.push({ text: listText(line), marker });
      continue;
    }

    // Texto plano en cualquier posición: tras el `##`, antes de la primera
    // entrada, dentro de una `###`/`####` o después de una lista. Las líneas
    // seguidas continúan el mismo párrafo; en una entrada con encabezado se
    // guardan como detalle sin marcador (se pintan sin viñeta).
    if (!currentItem) {
      currentItem = { details: [], plain: true };
      currentSection.items.push(currentItem);
    }
    currentItem.details.push({ text: line });
  }

  return cv;
}

export function cvToMarkdown(cv?: CvData): string {
  if (!cv) return '';

  let markdown = '';

  if (cv.properties && Object.keys(cv.properties).length > 0) {
    markdown += '---\n';
    Object.entries(cv.properties).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        markdown += `${key}:\n${value.map(item => `  - ${item}`).join('\n')}\n`;
      } else if (value) {
        markdown += `${key}: ${value}\n`;
      }
    });
    markdown += '---\n\n';
  }

  markdown += `# ${cv.contact.name}\n`;
  // Etiquetas originales conservadas (español o inglés) y campos vacíos omitidos.
  if (cv.contact.title) markdown += `- title: ${cv.contact.title}\n`;
  if (cv.contact.phone) markdown += `- ${cv.contact.phoneLabel || 'Phone'}: ${cv.contact.phone}\n`;
  if (cv.contact.email) markdown += `- ${cv.contact.emailLabel || 'Email'}: ${cv.contact.email}\n`;
  if (cv.contact.location) markdown += `- ${cv.contact.locationLabel || 'Location'}: ${cv.contact.location}\n`;

  cv.contact.links.forEach(link => {
    markdown += `- ${link.text}: ${link.url}\n`;
  });

  // Campos de contacto no reconocidos: se devuelven tal cual llegaron.
  cv.contact.other.forEach(({ key, value }) => {
    markdown += `- ${key}: ${value}\n`;
  });

  markdown += '\n';

  cv.sections.forEach(section => {
    // La sección de entrada (contenido antes del primer `##`) no lleva `##`.
    if (!section.preamble) {
      markdown += `## ${section.title}${section.break ? ' \\break' : ''}\n`;
    }

    section.items.forEach(item => {
      if (item.primary) {
        const header = `### ${item.primary}${item.primaryRight ? ` | ${item.primaryRight}` : ''}${item.break ? ' \\break' : ''}\n`;
        markdown += header;
      }
      if (item.secondary) {
        markdown += `#### ${item.secondary}${item.secondaryRight ? ` | ${item.secondaryRight}` : ''}\n`;
      }

      item.details.forEach(detail => {
        // Cada línea sale con su marcador original: `-`, `*`, `1.`… y el texto
        // plano (párrafos) sin nada delante.
        markdown += detail.marker ? `${detail.marker} ${detail.text}\n` : `${detail.text}\n`;
      });
      markdown += '\n';
    });
  });

  // `trim()` deja el markdown en forma canónica (sin sobras); el salto final
  // se vuelve a añadir porque un fichero de texto debe terminar en `\n`
  // (los exportadores avisan si no).
  return markdown.trim() + '\n';
}

/**
 * ¿El formateo ha perdido información? Compara línea a línea (ignorando
 * espacios): toda línea con contenido del original debe aparecer en el
 * resultado, salvo los campos de contacto vacíos, que se omiten a propósito.
 * Si devuelve false, el botón de formateo NO aplica los cambios.
 */
export function formatIsLossless(source: string, formatted: string): boolean {
  const norm = (s: string) => s.trim().replace(/\s+/g, ' ');
  const out = new Set(formatted.split('\n').map(norm));
  const emptyContact = /^-\s*[^:]+:\s*$/; // p. ej. "- Phone:" sin valor
  return source
    .split('\n')
    .map(norm)
    .every((line) => !line || out.has(line) || emptyContact.test(line));
}

export function validateCvMarkdown(markdown: string): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  const { content } = parseYamlFrontmatter(markdown);
  
  // Validate that content starts with a level 1 heading (#)
  const firstNonEmptyLine = content.split('\n').find(line => line.trim());
  if (!firstNonEmptyLine?.startsWith('# ')) {
    errors.push('CV must start with a level 1 heading (#) containing the name');
  }

  const cv = markdownToCv(markdown);

  // Validate contact information
  const requiredContactFields: (keyof ContactInfo)[] = ['name', 'title', 'email'];
  requiredContactFields.forEach(field => {
    if (!cv.contact[field]) {
      errors.push(`Missing required contact field: ${field}`);
    }
  });

  // Validate sections
  if (!cv.sections.length) {
    errors.push('CV must have at least one section');
  }

  // Validate each section has at least one item
  cv.sections.forEach((section, index) => {
    if (!section.items.length) {
      errors.push(`Section "${section.title || index + 1}" must have at least one item`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors
  };
} 
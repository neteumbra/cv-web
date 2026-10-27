/**
 * Render de una sección del CV (@react-pdf/renderer).
 *
 * Derivado de: xthecapx/cv-generator (apps/components/src/components/Section.tsx)
 * Copyright (c) xthecapx — Licensed under GPL-3.0 (ver /LICENSE)
 */
import { View, Text, Link, StyleSheet, type TextProps } from '@react-pdf/renderer';
import type { ReactNode } from 'react';
import type { CvSection as CvSectionType } from './types';
import { normalizeUrl } from './urls';
import { tokenizeInline } from './inline';

// `TextProps['style']` es `StyleProp` (estilos normales); el tipo resuelto de
// <Text> añade los atributos SVG, que estorban con la forma de array.
type TextStyleProp = TextProps['style'];

/**
 * Nodos en línea de una línea de detalle: enlace, **negrita**, *cursiva* o
 * texto literal. Negrita/cursiva anidadas se tokenizan a su vez (`**[t](u)**`),
 * así que el anidamiento termina siempre: el interior de un par no puede
 * contener otro asterisco.
 */
function inlineNodes(text: string, prefix = ''): ReactNode[] {
  return tokenizeInline(text).map((token, index) => {
    const key = `${prefix}${index}`;
    switch (token.kind) {
      case 'link':
        return (
          <Link key={key} src={normalizeUrl(token.href)} style={sectionStyles.link}>
            {token.text}
          </Link>
        );
      case 'bold':
        return <Text key={key} style={sectionStyles.bold}>{inlineNodes(token.text, `${key}.`)}</Text>;
      case 'italic':
        return <Text key={key} style={sectionStyles.italic}>{inlineNodes(token.text, `${key}.`)}</Text>;
      default:
        return <Text key={key}>{token.text}</Text>;
    }
  });
}

function DetailText({ text, style }: { text: string; style?: TextStyleProp }) {
  return <Text style={[sectionStyles.detailItem, style]}>{inlineNodes(text)}</Text>;
}

export const sectionStyles = StyleSheet.create({
  section: {
    marginBottom: 8,
  },
  sectionLast: {
    marginBottom: 0,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
    borderBottomStyle: 'solid',
    paddingBottom: 2,
    marginBottom: 4,
  },
  itemContainer: {
    marginBottom: 6,
  },
  itemLast: {
    marginBottom: 0,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 1,
  },
  primaryText: {
    fontFamily: 'Helvetica-Bold',
  },
  secondaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: '#666666',
    fontSize: 10,
    fontStyle: 'italic',
    marginBottom: 6,
  },
  detailsList: {
    marginLeft: 6,
    marginBottom: 6,
  },
  detailsListLast: {
    marginLeft: 6,
    marginBottom: 0,
  },
  detailItem: {
    fontSize: 10,
    marginBottom: 1,
  },
  /** Enlaces del cuerpo: se distinguen a simple vista en el PDF. */
  link: {
    color: '#1155cc',
    textDecoration: 'underline',
  },
  /** `**negrita**` en línea (hereda el tamaño del detalle). */
  bold: {
    fontFamily: 'Helvetica-Bold',
  },
  /** `*cursiva*` en línea: Helvetica → Helvetica-Oblique (variante registrada). */
  italic: {
    fontStyle: 'italic',
  },
  bullet: {
    width: 6,
  }
});

interface CvSectionProps {
  section: CvSectionType;
  isLast?: boolean;
}

export function Section({ section, isLast }: CvSectionProps) {
  const lastIndex = section.items.length - 1;
  // Último elemento visual de la última sección: sus márgenes inferiores son
  // "cola invisible" que react-pdf cuenta para paginar → se anulan para no
  // generar una página 2 en blanco.
  const trailing = (itemIndex: number) => !!isLast && itemIndex === lastIndex;

  return (
    <View
      style={isLast ? [sectionStyles.section, sectionStyles.sectionLast] : sectionStyles.section}
      break={section.break}
    >
      {/* La sección de entrada (texto antes del primer `##`) no lleva cabecera */}
      {section.title ? <Text style={sectionStyles.sectionTitle}>{section.title}</Text> : null}
      
      {section.items.map((item, itemIndex) => (
        <View
          key={itemIndex}
          style={trailing(itemIndex) ? [sectionStyles.itemContainer, sectionStyles.itemLast] : sectionStyles.itemContainer}
          break={item.break}
        >
          {(item.primary || item.primaryRight) && (
            <View style={sectionStyles.headerRow}>
              <Text style={sectionStyles.primaryText}>{item.primary}</Text>
              <Text>{item.primaryRight}</Text>
            </View>
          )}
          
          {(item.secondary || item.secondaryRight) && (
            <View style={sectionStyles.secondaryRow}>
              <Text>{item.secondary}</Text>
              <Text>{item.secondaryRight}</Text>
            </View>
          )}
          
          {/* El contenedor se pinta siempre (aunque no haya detalles): sus
              márgenes forman parte del espaciado original entre entradas */}
          <View style={trailing(itemIndex) ? [sectionStyles.detailsList, sectionStyles.detailsListLast] : sectionStyles.detailsList}>
            {item.details.map((detail, detailIndex) => {
              // Texto plano (párrafo): se apila sin viñeta.
              if (!detail.marker) {
                return (
                  <Text key={detailIndex} style={sectionStyles.detailItem}>
                    <DetailText text={detail.text} />
                  </Text>
                );
              }
              // Lista: pinta el marcador original — `•` para `-`, `*` y `+`,
              // y el número tal cual (`1.`, `2)`) para las listas numeradas.
              const numbered = /^\d/.test(detail.marker);
              return (
                <View key={detailIndex} style={{ flexDirection: 'row' }}>
                  <Text
                    style={
                      numbered
                        ? [sectionStyles.bullet, { width: detail.marker.length * 6 + 2 }]
                        : sectionStyles.bullet
                    }
                  >
                    {numbered ? `${detail.marker} ` : '• '}
                  </Text>
                  {/* flex:1 fuerza el wrap dentro del ancho disponible (enlaces largos) */}
                  <DetailText text={detail.text} style={{ flex: 1 }} />
                </View>
              );
            })}
          </View>
        </View>
      ))}
    </View>
  );
} 
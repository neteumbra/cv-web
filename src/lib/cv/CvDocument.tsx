/**
 * Documento PDF del CV (@react-pdf/renderer).
 *
 * Derivado de: xthecapx/cv-generator (apps/components/src/components/CvDocument.tsx)
 * Copyright (c) xthecapx — Licensed under GPL-3.0 (ver /LICENSE)
 */
import { Fragment } from 'react';
import { Document, Page, StyleSheet, View, Text, Link } from '@react-pdf/renderer';
import { Section } from './Section';
import { normalizeUrl, tidyUrl, looksLikeUrl } from './urls';
import type { CvData } from './types';

export const documentStyles = StyleSheet.create({
  page: {
    padding: 32, // reduced from 48
    fontFamily: 'Helvetica',
    fontSize: 12,
  },
  viewer: {
    width: '100%',
    height: '100vh',
  },
  header: {
    marginBottom: 16, // reduced from 32
    textAlign: 'center',
  },
  name: {
    fontSize: 24,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 4, // reduced from 8
  },
  title: {
    fontSize: 18,
    marginBottom: 8, // reduced from 16
    color: '#333333',
    fontFamily: 'Helvetica',
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2, // reduced from 4
    fontSize: 10,
    flexWrap: 'wrap',
  },
  contactText: {
    color: '#333333',
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  /** Enlaces de la cabecera (LinkedIn, GitHub, Portafolio...). */
  contactLink: {
    color: '#1155cc',
    fontSize: 10,
    fontFamily: 'Helvetica',
    textDecoration: 'underline',
  },
  bullet: {
    color: '#333333',
    paddingHorizontal: 2, // reduced from 4
    fontSize: 10,
  },
});
  
export const CvDocument = ({ cvData }: { cvData: CvData }) => {
  // Campos de contacto no reconocidos (p. ej. "- Disponible: freelance")
  const extras = cvData.contact.other.filter(({ value }) => value.trim());
  // Campos de contacto con valor: los vacíos no se pintan en el PDF, igual que
  // hace el formateo con la lista de contacto del markdown.
  const { phone, phoneLabel, email, emailLabel, location, locationLabel } = cvData.contact;
  const contactFields: Array<{ label: string; value: string; href?: string }> = [];
  if (phone) contactFields.push({ label: `${phoneLabel || 'Phone'}: `, value: phone, href: `tel:${phone}` });
  if (email) contactFields.push({ label: `${emailLabel || 'Email'}: `, value: email, href: `mailto:${email}` });
  if (location) contactFields.push({ label: `${locationLabel || 'Location'}: `, value: location });

  return (
    <Document>
      <Page size="A4" style={documentStyles.page}>
        <View style={documentStyles.header}>
          <Text style={documentStyles.name}>{cvData.contact.name}</Text>
          {cvData.contact.title && <Text style={documentStyles.title}>{cvData.contact.title}</Text>}
          {contactFields.length > 0 && (
            <View style={documentStyles.contactRow}>
              {contactFields.map((field, index) => (
                <Fragment key={field.label}>
                  {index > 0 && <Text style={documentStyles.bullet}>•</Text>}
                  <Text>{field.label}</Text>
                  {field.href ? (
                    <Link src={field.href} style={documentStyles.contactText}>
                      {field.value}
                    </Link>
                  ) : (
                    <Text style={documentStyles.contactText}>{field.value}</Text>
                  )}
                </Fragment>
              ))}
            </View>
          )}
          {cvData.contact.links.length > 0 && (
            <View style={documentStyles.contactRow}>
              {cvData.contact.links.map((link, index) => (
                <Fragment key={index}>
                  {index > 0 && <Text style={documentStyles.bullet}>•</Text>}
                  <Text>{`${link.text}: `}</Text>
                  {/* normalizeUrl evita el clásico https://https://... */}
                  <Link src={normalizeUrl(link.url)} style={documentStyles.contactLink}>
                    {tidyUrl(link.url)}
                  </Link>
                </Fragment>
              ))}
            </View>
          )}
          {extras.length > 0 && (
            <View style={documentStyles.contactRow}>
              {extras.map(({ key, value }, index) => (
                <Fragment key={`${key}-${index}`}>
                  {index > 0 && <Text style={documentStyles.bullet}>•</Text>}
                  <Text>{`${key}: `}</Text>
                  {looksLikeUrl(value) ? (
                    <Link src={normalizeUrl(value)} style={documentStyles.contactLink}>
                      {tidyUrl(value)}
                    </Link>
                  ) : (
                    <Text style={documentStyles.contactText}>{value}</Text>
                  )}
                </Fragment>
              ))}
            </View>
          )}
        </View>
        {cvData.sections.map((section, index) => (
          <Section
            key={index}
            section={section}
            isLast={index === cvData.sections.length - 1}
          />
        ))}
      </Page>
    </Document>
  );
};
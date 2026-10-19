/**
 * Tipos del dominio CV.
 *
 * Derivado de: xthecapx/cv-generator (apps/components/src/types.ts)
 * Copyright (c) xthecapx — Licensed under GPL-3.0 (ver /LICENSE)
 */
export interface ContactInfo {
  name: string;
  title: string;
  phone: string;
  email: string;
  /** Original markdown label of the phone field (e.g. "Teléfono"); renderer falls back to "Phone" */
  phoneLabel?: string;
  /** Original markdown label of the email field (e.g. "Correo"); renderer falls back to "Email" */
  emailLabel?: string;
  location: string;
  links: Array<{
    text: string;
    url: string;
  }>;
}

export interface CvItem {
  primary?: string;
  primaryRight?: string;
  secondary?: string;
  secondaryRight?: string;
  details: string[];
  /** Plain paragraph item: details render as stacked text without bullets */
  plain?: boolean;
  break?: boolean;
}

export interface CvSection {
  title: string;
  items: CvItem[];
  break?: boolean;
}

export interface CvProperties {
  [key: string]: string | string[] | undefined;
}

export interface CvData {
  properties?: CvProperties;
  contact: ContactInfo;
  sections: CvSection[];
}
// Modelo de los documentos legales (privacidad y términos) de cada app.
// Los textos viven en src/i18n/{es,en,pt}.json bajo <APP>.<DOCUMENTO>.
// Las claves de los bloques son relativas a la sección (si tiene key) o al documento.

export type LegalItem = string | { title: string; text: string; email?: boolean };

export type LegalBlock =
  | { type: 'p'; key: string }
  | { type: 'ul'; items: LegalItem[] }
  | { type: 'links'; links: { label: string; href: string }[] };

export interface LegalSection {
  // Si tiene key, el título se busca en <key>.TITLE
  key?: string;
  blocks: LegalBlock[];
}

export interface LegalDocument {
  key: 'PRIVACY_POLICY' | 'TERMS_CONDITIONS';
  // La sección CONTACT (TITLE y P1 + correo) se agrega siempre al final
  sections: LegalSection[];
}

export interface LegalTheme {
  page: string;
  border: string;
  card: string;
  accent: string;
  muted: string;
  strong: string;
  backLink: string;
}

export interface LegalApp {
  namespace: 'OPTIFINANZAS' | 'OPTISCAN';
  name: [string, string];
  logo: string;
  route: string;
  theme: LegalTheme;
  selectorVariant: 'green' | 'blue';
}

export const CONTACT_EMAIL = 'favamaximilianodev@gmail.com';

export const p = (key: string): LegalBlock => ({ type: 'p', key });
export const ul = (...items: LegalItem[]): LegalBlock => ({ type: 'ul', items });

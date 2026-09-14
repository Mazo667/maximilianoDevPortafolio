import { LegalApp, LegalDocument, p, ul } from '../../shared/legal-page/legal.models';

export const OPTIFINANZAS_APP: LegalApp = {
  namespace: 'OPTIFINANZAS',
  name: ['Opti', 'Finanzas'],
  logo: 'assets/icono_optifinanzas_no_bg.svg',
  route: '/optifinanzas',
  selectorVariant: 'green',
  theme: {
    page: 'bg-black text-gray-300',
    border: 'border-gray-800',
    card: 'bg-opti-dark-card border-gray-800',
    accent: 'text-opti-green',
    muted: 'text-gray-400',
    strong: 'text-gray-300',
    backLink: 'text-gray-400 hover:text-opti-green',
  },
};

export const OPTIFINANZAS_PRIVACY: LegalDocument = {
  key: 'PRIVACY_POLICY',
  sections: [
    { blocks: [p('INTRO')] },
    { key: 'COLLECTION', blocks: [p('P1'), ul('L1', 'L2', 'L3', 'L4'), p('P2'), p('P3'), p('P4'), p('P5')] },
    {
      key: 'THIRD_PARTY',
      blocks: [
        p('P1'),
        p('P2'),
        { type: 'links', links: [{ label: 'AdMob', href: 'https://support.google.com/admob/answer/6128543?hl=en' }] },
        p('P3'),
        ul('L1', 'L2', 'L3'),
      ],
    },
    { key: 'OPT_OUT', blocks: [p('P1')] },
    { key: 'RETENTION', blocks: [p('P1')] },
    {
      key: 'DATA_DELETION',
      blocks: [
        p('P1'),
        ul(
          { title: 'L1_TITLE', text: 'L1_DESC' },
          { title: 'L2_TITLE', text: 'L2_DESC' },
          { title: 'L3_TITLE', text: 'L3_DESC', email: true },
        ),
        p('P2'),
      ],
    },
    { key: 'CHILDREN', blocks: [p('P1'), p('P2')] },
    { key: 'SECURITY', blocks: [p('P1')] },
    { key: 'CHANGES', blocks: [p('P1')] },
    { key: 'CONSENT', blocks: [p('P1')] },
  ],
};

export const OPTIFINANZAS_TERMS: LegalDocument = {
  key: 'TERMS_CONDITIONS',
  sections: [
    {
      blocks: [
        p('P1'),
        p('P2'),
        p('RESTRICTIONS'),
        p('MODIFICATIONS'),
        p('SECURITY'),
        p('THIRD_PARTY_INTRO'),
        { type: 'links', links: [{ label: 'AdMob', href: 'https://developers.google.com/admob/terms' }] },
        p('CONNECTIVITY'),
        p('CHARGES'),
        p('BATTERY'),
        p('LIABILITY'),
        p('UPDATES'),
      ],
    },
    { key: 'CHANGES', blocks: [p('P1')] },
  ],
};

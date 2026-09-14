import { LegalApp, LegalDocument, p, ul } from '../../shared/legal-page/legal.models';

export const OPTISCAN_APP: LegalApp = {
  namespace: 'OPTISCAN',
  name: ['Opti', 'Scan'],
  logo: 'assets/optiscan_logo.webp',
  route: '/optiscan',
  selectorVariant: 'blue',
  theme: {
    page: 'bg-scan-bg text-slate-300',
    border: 'border-slate-800',
    card: 'bg-scan-card border-slate-800',
    accent: 'text-scan-accent',
    muted: 'text-slate-400',
    strong: 'text-slate-200',
    backLink: 'text-slate-400 hover:text-scan-accent',
  },
};

export const OPTISCAN_PRIVACY: LegalDocument = {
  key: 'PRIVACY_POLICY',
  sections: [
    { blocks: [p('INTRO')] },
    { key: 'COLLECTION', blocks: [p('P1'), p('P2'), ul('L1', 'L2', 'L3'), p('P3')] },
    { key: 'PERMISSIONS', blocks: [p('P1'), ul('L1', 'L2', 'L3'), p('P2')] },
    { key: 'OCR', blocks: [p('P1'), p('P2')] },
    { key: 'ADS', blocks: [p('P1'), p('P2'), p('P3')] },
    { key: 'PURCHASES', blocks: [p('P1')] },
    {
      key: 'THIRD_PARTY',
      blocks: [
        p('P1'),
        {
          type: 'links',
          links: [
            { label: 'Google Play Services', href: 'https://policies.google.com/privacy' },
            { label: 'AdMob', href: 'https://support.google.com/admob/answer/6128543' },
            { label: 'Google ML Kit', href: 'https://developers.google.com/ml-kit/terms' },
          ],
        },
        p('P2'),
        p('P3'),
      ],
    },
    { key: 'DATA_DELETION', blocks: [p('P1'), ul('L1', 'L2', 'L3', 'L4'), p('P2')] },
    { key: 'CHILDREN', blocks: [p('P1')] },
    { key: 'SECURITY', blocks: [p('P1')] },
    { key: 'CHANGES', blocks: [p('P1')] },
    { key: 'CONSENT', blocks: [p('P1')] },
  ],
};

export const OPTISCAN_TERMS: LegalDocument = {
  key: 'TERMS_CONDITIONS',
  sections: [
    { blocks: [p('P1'), p('P2')] },
    { key: 'LICENSE', blocks: [p('P1'), p('P2')] },
    { key: 'CONTENT', blocks: [p('P1'), p('P2')] },
    { key: 'PRO', blocks: [p('P1'), p('P2'), ul('L1', 'L2', 'L3', 'L4'), p('P3')] },
    { key: 'ADS', blocks: [p('P1')] },
    { key: 'ACCURACY', blocks: [p('P1')] },
    { key: 'BACKUPS', blocks: [p('P1')] },
    {
      key: 'THIRD_PARTY',
      blocks: [
        p('P1'),
        {
          type: 'links',
          links: [
            { label: 'Google Play', href: 'https://play.google.com/about/play-terms/' },
            { label: 'AdMob', href: 'https://developers.google.com/admob/terms' },
            { label: 'Google ML Kit', href: 'https://developers.google.com/ml-kit/terms' },
          ],
        },
      ],
    },
    { key: 'CONNECTIVITY', blocks: [p('P1')] },
    { key: 'LIABILITY', blocks: [p('P1')] },
    { key: 'UPDATES', blocks: [p('P1')] },
    { key: 'CHANGES', blocks: [p('P1')] },
  ],
};

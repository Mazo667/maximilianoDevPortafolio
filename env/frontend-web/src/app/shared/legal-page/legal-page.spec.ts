import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { testProviders, UNTRANSLATED_KEY, useTranslations } from '../../../testing/translate-testing';
import { OPTIFINANZAS_APP, OPTIFINANZAS_PRIVACY, OPTIFINANZAS_TERMS } from '../../pages/optifinanzas/legal-content';
import { OPTISCAN_APP, OPTISCAN_PRIVACY, OPTISCAN_TERMS } from '../../pages/optiscan/legal-content';
import { LegalPage } from './legal-page';
import { LegalApp, LegalDocument } from './legal.models';

const CASES: [string, LegalApp, LegalDocument][] = [
  ['OptiScan privacidad', OPTISCAN_APP, OPTISCAN_PRIVACY],
  ['OptiScan términos', OPTISCAN_APP, OPTISCAN_TERMS],
  ['OptiFinanzas privacidad', OPTIFINANZAS_APP, OPTIFINANZAS_PRIVACY],
  ['OptiFinanzas términos', OPTIFINANZAS_APP, OPTIFINANZAS_TERMS],
];

describe('LegalPage', () => {
  async function render(app: LegalApp, document: LegalDocument, lang: string) {
    TestBed.configureTestingModule({
      imports: [LegalPage],
      providers: [
        ...testProviders(),
        { provide: ActivatedRoute, useValue: { snapshot: { data: { app, document } } } },
      ],
    });
    useTranslations(lang);
    const fixture = TestBed.createComponent(LegalPage);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  for (const [name, app, document] of CASES) {
    for (const lang of ['es', 'en', 'pt']) {
      it(`${name} (${lang}): todas las claves existen en las traducciones`, async () => {
        const element = await render(app, document, lang);
        expect(element.textContent).not.toMatch(UNTRANSLATED_KEY);
        expect(element.querySelector('h1')?.textContent?.trim()).toBeTruthy();
      });
    }
  }

  it('muestra una sección por cada entrada con título más la de contacto', async () => {
    const element = await render(OPTISCAN_APP, OPTISCAN_PRIVACY, 'es');
    const titled = OPTISCAN_PRIVACY.sections.filter(s => s.key).length;
    expect(element.querySelectorAll('h2').length).toBe(titled + 1);
    expect(element.querySelector('a[href="mailto:favamaximilianodev@gmail.com"]')).toBeTruthy();
    expect(element.querySelector('h1')?.textContent).toContain('Política de Privacidad');
  });
});

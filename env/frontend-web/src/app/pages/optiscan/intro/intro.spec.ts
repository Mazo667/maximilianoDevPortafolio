import { TestBed } from '@angular/core/testing';
import { testProviders, UNTRANSLATED_KEY, useTranslations } from '../../../../testing/translate-testing';
import { LanguageService } from '../../../shared/language.service';
import { OptiScanIntro } from './intro';

describe('OptiScanIntro', () => {
  async function render(lang: string) {
    TestBed.configureTestingModule({ imports: [OptiScanIntro], providers: testProviders() });
    useTranslations(lang);
    TestBed.inject(LanguageService).use(lang);
    const fixture = TestBed.createComponent(OptiScanIntro);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  for (const lang of ['es', 'en', 'pt']) {
    it(`no deja claves sin traducir y usa el botón de Google Play en ${lang}`, async () => {
      const element = await render(lang);
      expect(element.textContent).not.toMatch(UNTRANSLATED_KEY);
      const badge = element.querySelector('img[src*="obtener_google_play_store"]');
      expect(badge?.getAttribute('src')).toBe(`assets/obtener_google_play_store_${lang}.svg`);
    });
  }

  it('enlaza a las URLs legales que usa la app', async () => {
    const element = await render('es');
    const links = Array.from(element.querySelectorAll('a')).map(a => a.getAttribute('href'));
    expect(links).toEqual(expect.arrayContaining(['/optiscan/terminos-uso', '/optiscan/politicas-privacidad']));
  });
});

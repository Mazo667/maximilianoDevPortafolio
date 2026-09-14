import { TestBed } from '@angular/core/testing';
import { testProviders, UNTRANSLATED_KEY, useTranslations } from '../../../../testing/translate-testing';
import { IntroComponent } from './intro';

describe('IntroComponent (OptiFinanzas)', () => {
  for (const lang of ['es', 'en', 'pt']) {
    it(`no deja claves sin traducir (${lang})`, async () => {
      TestBed.configureTestingModule({ imports: [IntroComponent], providers: testProviders() });
      useTranslations(lang);
      const fixture = TestBed.createComponent(IntroComponent);
      await fixture.whenStable();
      const element = fixture.nativeElement as HTMLElement;
      expect(element.textContent).not.toMatch(UNTRANSLATED_KEY);
      expect(element.querySelector('app-language-selector')).toBeTruthy();
    });
  }
});

import { TestBed } from '@angular/core/testing';
import { testProviders, UNTRANSLATED_KEY, useTranslations } from '../../../testing/translate-testing';
import { HomeComponent } from './home';

describe('HomeComponent', () => {
  async function render(lang: string) {
    TestBed.configureTestingModule({ imports: [HomeComponent], providers: testProviders() });
    useTranslations(lang);
    const fixture = TestBed.createComponent(HomeComponent);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  for (const lang of ['es', 'en', 'pt']) {
    it(`no deja claves sin traducir (${lang})`, async () => {
      const element = await render(lang);
      expect(element.textContent).not.toMatch(UNTRANSLATED_KEY);
    });
  }

  it('muestra el texto en el idioma activo', async () => {
    const element = await render('en');
    expect(element.querySelector('h1')?.textContent).toContain("Hi, I'm");
  });

  it('lista OptiScan entre los proyectos', async () => {
    const element = await render('es');
    const titles = Array.from(element.querySelectorAll('#proyectos h3')).map(h => h.textContent?.trim());
    expect(titles).toContain('OptiScan');
  });

  it('enlaza las páginas legales de las apps en el footer', async () => {
    const element = await render('es');
    const links = Array.from(element.querySelectorAll('footer a')).map(a => a.getAttribute('href'));
    expect(links).toEqual(expect.arrayContaining([
      '/optiscan/politicas-privacidad',
      '/optiscan/terminos-uso',
      '/optifinanzas/politica-de-privacidad',
      '/optifinanzas/terminos-y-condiciones',
    ]));
  });

  it('carga las imágenes de los proyectos en diferido', async () => {
    const element = await render('es');
    const images = element.querySelectorAll('#proyectos img');
    expect(images.length).toBeGreaterThan(0);
    images.forEach(img => expect(img.getAttribute('loading')).toBe('lazy'));
  });
});

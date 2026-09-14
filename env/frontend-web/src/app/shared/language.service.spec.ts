import { TestBed } from '@angular/core/testing';
import { TranslateService, provideTranslateService } from '@ngx-translate/core';
import { LanguageService } from './language.service';

// ngx-translate lee navigator.languages[0] (y navigator.language como respaldo)
function mockBrowserLanguage(culture: string) {
  vi.spyOn(navigator, 'languages', 'get').mockReturnValue([culture]);
  vi.spyOn(navigator, 'language', 'get').mockReturnValue(culture);
}

describe('LanguageService', () => {
  let service: LanguageService;
  let translate: TranslateService;

  beforeEach(() => {
    localStorage.clear();
    window.history.replaceState({}, '', '/');
    mockBrowserLanguage('fr-FR');

    TestBed.configureTestingModule({ providers: [provideTranslateService()] });
    service = TestBed.inject(LanguageService);
    translate = TestBed.inject(TranslateService);
  });

  afterEach(() => vi.restoreAllMocks());

  it('usa español si no hay otra preferencia soportada', () => {
    service.init();
    expect(translate.getCurrentLang()).toBe('es');
    expect(document.documentElement.lang).toBe('es');
  });

  it('usa el idioma del navegador si está soportado', () => {
    mockBrowserLanguage('pt-BR');
    service.init();
    expect(service.current().code).toBe('pt');
  });

  it('recuerda el idioma elegido antes, por encima del navegador', () => {
    mockBrowserLanguage('pt-BR');
    localStorage.setItem('lang', 'en');
    service.init();
    expect(service.current().code).toBe('en');
  });

  it('el parámetro ?lang= tiene prioridad sobre todo lo demás', () => {
    localStorage.setItem('lang', 'en');
    window.history.replaceState({}, '', '/optiscan?lang=pt');
    service.init();
    expect(service.current().code).toBe('pt');
  });

  it('ignora idiomas no soportados en ?lang=', () => {
    window.history.replaceState({}, '', '/optiscan?lang=de');
    service.init();
    expect(service.current().code).toBe('es');
  });

  it('use() cambia el idioma y lo guarda', () => {
    service.init();
    service.use('en');
    expect(translate.getCurrentLang()).toBe('en');
    expect(localStorage.getItem('lang')).toBe('en');
    expect(document.documentElement.lang).toBe('en');
  });
});

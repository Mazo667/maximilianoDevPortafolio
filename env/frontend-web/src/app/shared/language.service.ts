import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export interface Language {
  code: string;
  name: string;
  flag: string;
}

export const LANGUAGES: Language[] = [
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' }
];

export const DEFAULT_LANGUAGE = 'es';
const STORAGE_KEY = 'lang';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private translate = inject(TranslateService);
  private document = inject(DOCUMENT);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly languages = LANGUAGES;
  readonly current = signal(LANGUAGES[0]);

  init() {
    this.translate.addLangs(LANGUAGES.map(l => l.code));
    this.translate.setFallbackLang(DEFAULT_LANGUAGE);
    this.use(this.detect());
  }

  use(code: string) {
    const language = this.find(code) ?? this.find(DEFAULT_LANGUAGE)!;
    this.translate.use(language.code);
    this.current.set(language);
    this.document.documentElement.lang = language.code;

    if (this.isBrowser) {
      try {
        localStorage.setItem(STORAGE_KEY, language.code);
      } catch {
        // Modo privado o almacenamiento bloqueado: el idioma simplemente no se recuerda
      }
    }
  }

  // Prioridad: ?lang= en la URL (enlaces desde las apps) > idioma elegido antes > idioma del navegador.
  // En el servidor (prerender) siempre se usa el idioma por defecto.
  private detect(): string {
    if (!this.isBrowser) {
      return DEFAULT_LANGUAGE;
    }

    const fromQuery = new URLSearchParams(this.document.location.search).get('lang');
    let fromStorage: string | null = null;
    try {
      fromStorage = localStorage.getItem(STORAGE_KEY);
    } catch { }
    const fromBrowser = this.translate.getBrowserLang();

    return [fromQuery, fromStorage, fromBrowser].find(code => code && this.find(code)) ?? DEFAULT_LANGUAGE;
  }

  private find(code: string) {
    return LANGUAGES.find(l => l.code === code);
  }
}

import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TranslateService, TranslationObject, provideTranslateService } from '@ngx-translate/core';
import en from '../i18n/en.json';
import es from '../i18n/es.json';
import pt from '../i18n/pt.json';

export const TRANSLATIONS: Record<string, TranslationObject> = { es, en, pt };

// Proveedores comunes para tests de componentes que usan traducciones y rutas
export const testProviders = () => [
  provideRouter([]),
  provideTranslateService({ fallbackLang: 'es' }),
];

// Carga los JSON reales en el TranslateService y activa el idioma pedido
export function useTranslations(lang = 'es') {
  const translate = TestBed.inject(TranslateService);
  for (const [code, translations] of Object.entries(TRANSLATIONS)) {
    translate.setTranslation(code, translations);
  }
  translate.use(lang);
  return translate;
}

// Detecta claves sin traducir que quedaron visibles en la página (ej: "OPTISCAN.TITLE")
export const UNTRANSLATED_KEY = /\b(HOME|SEO|OPTISCAN|OPTIFINANZAS)\.[A-Z_.]+/;

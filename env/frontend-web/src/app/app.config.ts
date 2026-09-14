import { ApplicationConfig, Injectable, PendingTasks, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { TranslateLoader, TranslationObject, provideTranslateLoader, provideTranslateService } from '@ngx-translate/core';
import { from } from 'rxjs';
import { DEFAULT_LANGUAGE } from './shared/language.service';

// Cada idioma se empaqueta como un archivo JS con hash en el nombre (se descarga solo cuando se usa).
// Así, al publicar una versión nueva el navegador nunca usa traducciones viejas de su caché.
const TRANSLATIONS: Record<string, () => Promise<{ default: TranslationObject }>> = {
  es: () => import('../i18n/es.json'),
  en: () => import('../i18n/en.json'),
  pt: () => import('../i18n/pt.json'),
};

@Injectable()
export class BundledTranslateLoader implements TranslateLoader {
  private pendingTasks = inject(PendingTasks);

  getTranslation(lang: string) {
    const load = TRANSLATIONS[lang] ?? TRANSLATIONS[DEFAULT_LANGUAGE];
    // PendingTasks hace que el prerender espere a que carguen los textos antes de generar el HTML
    const done = this.pendingTasks.add();
    return from(load().then(module => module.default).finally(done));
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideTranslateService({
      fallbackLang: DEFAULT_LANGUAGE,
      loader: provideTranslateLoader(BundledTranslateLoader),
    }),
  ]
};

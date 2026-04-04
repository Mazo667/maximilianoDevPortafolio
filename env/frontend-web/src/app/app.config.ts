import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

// 1. Creamos nuestro propio Loader nativo (Reemplaza a la librería conflictiva)
export class CustomTranslateLoader implements TranslateLoader {
  constructor(private http: HttpClient) { }

  getTranslation(lang: string) {
    // Busca el archivo JSON correspondiente al idioma
    return this.http.get<any>(`/assets/i18n/${lang}.json`);
  }
}

// 2. Factoría que inyecta el HttpClient
export function HttpLoaderFactory(http: HttpClient) {
  return new CustomTranslateLoader(http);
}

// 3. Configuración principal
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()), // Requerido para SSR
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'es',
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })
    )
  ]
};
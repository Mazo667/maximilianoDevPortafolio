import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter, map, switchMap } from 'rxjs';

export const SITE_URL = 'https://maximilianodev.com';

// Datos SEO de cada ruta (claves de traducción bajo "SEO" en src/i18n)
export interface SeoData {
  title: string;
  description: string;
  image?: string;
}

const OG_LOCALES: Record<string, string> = { es: 'es_AR', en: 'en_US', pt: 'pt_BR' };

@Injectable({ providedIn: 'root' })
export class SeoService {
  private router = inject(Router);
  private translate = inject(TranslateService);
  private title = inject(Title);
  private meta = inject(Meta);
  private document = inject(DOCUMENT);

  init() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.deepestChild(this.router.routerState.snapshot.root)),
      // stream() vuelve a emitir cuando cambia el idioma, así los tags siempre están traducidos
      switchMap(route => {
        const seo: SeoData | undefined = route.data['seo'];
        const keys = seo ? [seo.title, seo.description] : ['SEO.HOME.TITLE', 'SEO.HOME.DESCRIPTION'];
        return this.translate.stream(keys).pipe(
          map(texts => ({ title: texts[keys[0]], description: texts[keys[1]], image: seo?.image, route }))
        );
      })
    ).subscribe(({ title, description, image, route }) => {
      this.apply(title, description, image, route);
    });
  }

  private apply(title: string, description: string, image: string | undefined, route: ActivatedRouteSnapshot) {
    const path = '/' + route.pathFromRoot.flatMap(r => r.url.map(segment => segment.path)).join('/');
    const url = SITE_URL + path;

    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:locale', content: OG_LOCALES[this.translate.getCurrentLang()] ?? OG_LOCALES['es'] });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });

    if (image) {
      this.meta.updateTag({ property: 'og:image', content: `${SITE_URL}/${image}` });
    } else {
      this.meta.removeTag('property="og:image"');
    }

    this.setCanonical(url);
  }

  private setCanonical(url: string) {
    let link = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.rel = 'canonical';
      this.document.head.appendChild(link);
    }
    link.href = url;
  }

  private deepestChild(route: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
    return route.firstChild ? this.deepestChild(route.firstChild) : route;
  }
}

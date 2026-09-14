import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { Router, provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { useTranslations } from '../../testing/translate-testing';
import { SeoService } from './seo.service';

@Component({ template: '' })
class Empty { }

describe('SeoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideTranslateService({ fallbackLang: 'es' }),
        provideRouter([
          { path: 'home', component: Empty },
          {
            path: 'optiscan', component: Empty,
            data: { seo: { title: 'SEO.OPTISCAN.TITLE', description: 'SEO.OPTISCAN.DESCRIPTION', image: 'assets/optiscan_logo.png' } }
          },
        ]),
      ],
    });
  });

  it('pone título, descripción, Open Graph y canonical traducidos según la ruta', async () => {
    const translate = useTranslations('es');
    TestBed.inject(SeoService).init();
    await TestBed.inject(Router).navigateByUrl('/optiscan');

    const meta = TestBed.inject(Meta);
    expect(TestBed.inject(Title).getTitle()).toBe('OptiScan | Escáner de documentos para Android');
    expect(meta.getTag('property="og:image"')?.content).toBe('https://maximilianodev.com/assets/optiscan_logo.png');
    expect(meta.getTag('property="og:url"')?.content).toBe('https://maximilianodev.com/optiscan');
    expect(document.head.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe('https://maximilianodev.com/optiscan');

    translate.use('en');
    expect(TestBed.inject(Title).getTitle()).toBe('OptiScan | Document scanner for Android');
    expect(meta.getTag('property="og:locale"')?.content).toBe('en_US');
  });

  it('quita og:image en rutas sin imagen', async () => {
    useTranslations('es');
    TestBed.inject(SeoService).init();
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/optiscan');
    await router.navigateByUrl('/home');

    expect(TestBed.inject(Meta).getTag('property="og:image"')).toBeNull();
    expect(TestBed.inject(Title).getTitle()).toBe('Maximiliano Fava | Desarrollador de Software');
  });
});

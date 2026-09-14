import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { IntroComponent } from './pages/optifinanzas/intro/intro';
import { OPTIFINANZAS_APP, OPTIFINANZAS_PRIVACY, OPTIFINANZAS_TERMS } from './pages/optifinanzas/legal-content';
import { OptiScanIntro } from './pages/optiscan/intro/intro';
import { OPTISCAN_APP, OPTISCAN_PRIVACY, OPTISCAN_TERMS } from './pages/optiscan/legal-content';
import { LegalPage } from './shared/legal-page/legal-page';
import { SeoData } from './shared/seo.service';

const seo = (key: string, image?: string): SeoData => ({
    title: `SEO.${key}.TITLE`,
    description: `SEO.${key}.DESCRIPTION`,
    image,
});

// Si agregás o cambiás una ruta, actualizá también public/sitemap.xml
export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirige la raíz al home
    { path: 'home', component: HomeComponent, data: { seo: seo('HOME') } },

    { path: 'optifinanzas', component: IntroComponent, data: { seo: seo('OPTIFINANZAS', 'assets/icono_optifinanzas.webp') } },
    {
        path: 'optifinanzas/terminos-y-condiciones', component: LegalPage,
        data: { app: OPTIFINANZAS_APP, document: OPTIFINANZAS_TERMS, seo: seo('OPTIFINANZAS_TERMS', 'assets/icono_optifinanzas.webp') }
    },
    {
        path: 'optifinanzas/politica-de-privacidad', component: LegalPage,
        data: { app: OPTIFINANZAS_APP, document: OPTIFINANZAS_PRIVACY, seo: seo('OPTIFINANZAS_PRIVACY', 'assets/icono_optifinanzas.webp') }
    },

    { path: 'optiscan', component: OptiScanIntro, data: { seo: seo('OPTISCAN', 'assets/optiscan_logo.png') } },
    // Estas URLs están enlazadas desde la app (lib/core/constants/app_links.dart) y en Google Play: no cambiarlas
    {
        path: 'optiscan/terminos-uso', component: LegalPage,
        data: { app: OPTISCAN_APP, document: OPTISCAN_TERMS, seo: seo('OPTISCAN_TERMS', 'assets/optiscan_logo.png') }
    },
    {
        path: 'optiscan/politicas-privacidad', component: LegalPage,
        data: { app: OPTISCAN_APP, document: OPTISCAN_PRIVACY, seo: seo('OPTISCAN_PRIVACY', 'assets/optiscan_logo.png') }
    },
    { path: 'optiscan/terminos-y-condiciones', redirectTo: '/optiscan/terminos-uso' },
    { path: 'optiscan/politica-de-privacidad', redirectTo: '/optiscan/politicas-privacidad' },

    { path: '**', redirectTo: '/home' } // Manejo de errores 404
];

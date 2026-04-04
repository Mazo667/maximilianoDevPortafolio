import { Routes } from '@angular/router';
import { IntroComponent } from './pages/optifinanzas/intro/intro';
import { Terminos } from './pages/optifinanzas/terminos/terminos';
import { Privacidad } from './pages/optifinanzas/privacidad/privacidad';
import { HomeComponent } from './pages/home/home';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirige la raíz al home
    { path: 'home', component: HomeComponent },
    { path: 'optifinanzas', component: IntroComponent },
    { path: 'optifinanzas/terminos-y-condiciones', component: Terminos },
    { path: 'optifinanzas/politica-de-privacidad', component: Privacidad },
    { path: '**', redirectTo: '/home' } // Manejo de errores 404
];
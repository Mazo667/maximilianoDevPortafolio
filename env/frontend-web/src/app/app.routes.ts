import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { IntroComponent } from './pages/optifinanzas/intro/intro';
import { Terminos } from './pages/optifinanzas/terminos/terminos';
import { Privacidad } from './pages/optifinanzas/privacidad/privacidad';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirige la raíz al home
    { path: 'home', component: Home },
    { path: 'optifinanzas', component: IntroComponent },
    { path: 'optifinanzas/terminos-y-condiciones', component: Terminos },
    { path: 'optifinanzas/politica-de-privacidad', component: Privacidad },
    { path: '**', redirectTo: '/home' } // Manejo de errores 404
];
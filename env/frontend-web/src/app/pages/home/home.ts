import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSelector } from '../../shared/language-selector/language-selector';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, TranslateModule, LanguageSelector],
  templateUrl: './home.html',
})

export class HomeComponent {

  // Descripción y categoría se traducen desde HOME.PROJECTS.<key> en src/i18n
  misProyectos = [
    {
      key: 'OPTISCAN',
      titulo: 'OptiScan',
      imagen: 'assets/optiscan_logo.webp',
      etiquetas: ['Android', 'Flutter', 'OCR'],
      ruta: '/optiscan'
    },
    {
      key: 'OPTIFINANZAS',
      titulo: 'OptiFinanzas',
      imagen: 'assets/icono_optifinanzas_no_bg.svg',
      etiquetas: ['Android', 'Kotlin'],
      ruta: '/optifinanzas'
    },
    {
      key: 'OPTISTOCK',
      titulo: 'OptiStock',
      imagen: 'assets/optistock_logo.svg',
      etiquetas: ['Django', 'Python', 'Web'],
      ruta: '/optistock' //TODO: Crear ruta
    },
  ];

  // Enlaces legales exigidos por Google Play, visibles desde el footer
  legalApps = [
    { nombre: 'OptiScan', privacidad: '/optiscan/politicas-privacidad', terminos: '/optiscan/terminos-uso' },
    { nombre: 'OptiFinanzas', privacidad: '/optifinanzas/politica-de-privacidad', terminos: '/optifinanzas/terminos-y-condiciones' },
  ];

}

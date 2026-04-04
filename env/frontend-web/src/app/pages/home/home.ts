import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.html',
})

export class HomeComponent {

  misProyectos = [
    {
      titulo: 'OptiFinanzas',
      descripcion: 'Gestor financiero inteligente diseñado para ayudarte a optimizar ingresos y aplicar la regla 50/30/20 día a día.',
      imagen: 'assets/icono_optifinanzas_no_bg.svg',
      etiquetas: ['Android', 'Finanzas', 'Kotlin'],
      ruta: '/optifinanzas'
    },
    {
      titulo: 'OptiStock',
      descripcion: 'Sistema avanzado de inventario y control de stock para optimizar la cadena de suministro.',
      imagen: 'assets/optistock_logo.svg',
      etiquetas: ['Django', 'Python', 'Web'],
      ruta: '/optistock' //TODO: Crear ruta
    },
  ];

}
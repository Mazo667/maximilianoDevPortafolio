import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule], // <-- Fundamental para usar routerLink
  templateUrl: './home.html',
})
export class HomeComponent {

  // Aquí agregas, editas o eliminas tus proyectos en el futuro.
  // El HTML se actualizará automáticamente.
  misProyectos = [
    {
      titulo: 'OptiFinanzas',
      descripcion: 'Gestor financiero inteligente diseñado para ayudarte a optimizar ingresos y aplicar la regla 50/30/20 día a día.',
      imagen: 'assets/icono_optifinanzas_no_bg.svg', // Icono de tu app
      etiquetas: ['Android', 'Finanzas', 'Kotlin'],
      ruta: '/optifinanzas' // La ruta de la intro que ya creamos
    },
    {
      titulo: 'OptiStock',
      descripcion: 'Sistema avanzado de inventario y control de stock para optimizar la cadena de suministro.',
      imagen: 'assets/optistock_logo.svg', // Reemplaza con una imagen real luego
      etiquetas: ['Django', 'Python', 'Web'],
      ruta: '/optistock' // La ruta que crearás en el futuro
    },
  ];

}
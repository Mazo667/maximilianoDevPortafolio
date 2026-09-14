/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      // Definimos la tipografía Poppins
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // 'sans' se convierte en Poppins por defecto
      },
      // Definimos tu color verde específico de OptiFinanzas
      colors: {
        'opti-green': '#22C55E', // Código de color extraído del logo
        'opti-dark-card': '#171717', // Un gris muy oscuro para la tarjeta
        // Colores de OptiScan (extraídos del logo y del tema de la app)
        'scan-blue': '#1E40AF',
        'scan-accent': '#3B82F6',
        'scan-bg': '#0B1220',
        'scan-card': '#111A2E',
      },
    },
  },
  plugins: [],
}
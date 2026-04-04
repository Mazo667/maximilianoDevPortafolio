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
      },
    },
  },
  plugins: [],
}
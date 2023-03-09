/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
   // These paths are just examples, customize them to match your project structure
  theme: {
    extend: {},
    fontFamily: {
      roboto:['Oswald', 'sans-serif'],
      golos: ['Golos Text', 'sans-serif'],
    }
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
    require('tailwind-scrollbar-hide'),
  ],
  variants: {
    scrollbar: ['rounded'],
  }
}

/** @type {import('tailwindcss').Config} */

import daisyui from 'daisyui';
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:'#00A676',
        secondary:'#070821',

      }
    },
  },
  plugins: [
    daisyui,
  ],
}
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

      },
      backgroundImage: {
        'subscribe': "url('/src/assets/bg/sub.jpg')",
        'allpost': "url('/src/assets/bg/allpost.jpg')",
        'addpost': "url('/src/assets/bg/addpost.jpg')",
        'update': "url('/src/assets/bg/update.jpg')",
        'manage': "url('/src/assets/bg/manage.jpg')",
        'add': "url('/src/assets/bg/add.jpg')",
      }
    },
  },
  plugins: [
    daisyui,
  ],
}
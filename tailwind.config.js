/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    '*.{html,js}',
    './dist/*.js'
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue': 'hsl(235, 46%, 20%)',
        'darker-blue': 'hsl(226, 43%, 10%)',
        'desaturated-blue': 'hsl(235, 45%, 61%)',
        'pale-blue': 'hsl(236, 100%, 87%)'
      }
    },
  },
  plugins: [],
}


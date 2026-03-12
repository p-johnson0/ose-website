/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        maroon: '#800020',
        'maroon-dark': '#5c0017',
        'maroon-light': '#a0002a',
        gold: '#c5a028',
        'gold-light': '#d4b53a',
        cream: '#f9f6f0',
        'cream-dark': '#ede9e0',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        body: ['var(--font-lato)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

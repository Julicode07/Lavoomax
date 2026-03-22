/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#1a2b5e',
        lime: '#8cc63f',
        'lime-light': '#a8d94a',
        'navy-dark': '#0f1a3a',
        'navy-light': '#243470',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

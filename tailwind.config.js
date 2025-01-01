/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background1' : '#111827',
        'text1' : 'white',
        'shadow1': 'rgba(0,0,0,0.2)'
      }
    },
  },
  plugins: [],
}



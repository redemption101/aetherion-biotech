/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,js}"
  ],
  theme: {
    extend: {
      colors: {
        aether: '#0d1117',
        neon: '#58a6ff',
        hazard: '#da3633',
        safe: '#238636'
      }
    },
  },
  plugins: [],
}

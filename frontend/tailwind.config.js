/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,js}"
  ],
  theme: {
    extend: {
      colors: {
        aether: '#020617', // Deep space dark
        panel: '#0f172a', // Sleek glass dark
        borderize: '#1e293b', 
        neon: '#38bdf8', // Cyberpunk blue
        hazard: '#ef4444', // Alert red
        safe: '#10b981', // Matrix green
        warning: '#f59e0b'
      },
      boxShadow: {
        'glow-safe': '0 0 25px rgba(16, 185, 129, 0.15)',
        'glow-hazard': '0 0 25px rgba(239, 68, 68, 0.15)',
        'glow-neon': '0 0 25px rgba(56, 189, 248, 0.15)',
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'quantum-blue': '#1e40af',
        'quantum-cyan': '#06b6d4',
        'quantum-purple': '#7c3aed',
        'fusion-green': '#10b981',
        'fusion-orange': '#f97316',
        'fusion-red': '#ef4444',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}

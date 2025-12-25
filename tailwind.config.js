/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Custom brand colors for Guitar Mastery Hub
        navy: {
          DEFAULT: '#1e3a8a', // Main navy blue
          dark: '#1e293b',    // Darker navy for gradients
          light: '#3b82f6',   // Lighter navy for accents
        },
        gold: {
          DEFAULT: '#f59e0b', // Main gold/amber color
          light: '#fbbf24',   // Lighter gold
          dark: '#d97706',    // Darker gold
        },
      },
      fontFamily: {
        accent: ['system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

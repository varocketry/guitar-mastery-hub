/**
 * GUITAR MASTERY HUB - TAILWIND CONFIGURATION
 * ===========================================
 * Official brand colors from December 18, 2025 design system
 */

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
        // PRIMARY BRAND COLORS (Official GMH Design System)
        'navy': {
          DEFAULT: '#1E3A8A',  // Dark Navy - main brand color
          light: '#2563EB',     // Lighter navy
          dark: '#1E40AF',      // Darker navy for gradients
        },
        'gold': {
          DEFAULT: '#D4AF37',  // Gold Bronze - accents & CTAs
          light: '#E6C550',     // Lighter gold
          dark: '#C49F2D',      // Darker gold
        },
        'accent-blue': {
          DEFAULT: '#4A90E2',  // Accent Blue - links & highlights
          light: '#60A5FA',
          dark: '#2563EB',
        },
        'teal': {
          DEFAULT: '#0D47A1',  // Deep Teal - secondary buttons
          light: '#1E88E5',
          dark: '#0D47A1',
        },
        'light': '#F0F0F0',    // Light Gray - subtle backgrounds
        
        // SEMANTIC COLORS
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#4A90E2',
        
        // GRAYS
        gray: {
          50: '#FAFAFA',
          100: '#F7F7F7',
          200: '#E8E8E8',
          300: '#D0D0D0',
          400: '#A8A8A8',
          500: '#888888',
          600: '#666666',
          700: '#444444',
          800: '#2A2A2A',
          900: '#1A1A1A',
        },
      },
      
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        accent: ['Montserrat', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      
      fontSize: {
        'xs': '0.75rem',      // 12px
        'sm': '0.875rem',     // 14px
        'base': '1rem',       // 16px
        'lg': '1.125rem',     // 18px
        'xl': '1.25rem',      // 20px
        '2xl': '1.5rem',      // 24px
        '3xl': '1.875rem',    // 30px
        '4xl': '2.25rem',     // 36px
        '5xl': '3rem',        // 48px
        '6xl': '4rem',        // 64px
      },
      
      borderRadius: {
        'sm': '0.25rem',   // 4px
        'md': '0.5rem',    // 8px
        'lg': '1rem',      // 16px
        'xl': '1.5rem',    // 24px
        'full': '9999px',
      },
      
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },
      
      zIndex: {
        'dropdown': '1000',
        'sticky': '1020',
        'fixed': '1030',
        'modal-backdrop': '1040',
        'modal': '1050',
        'popover': '1060',
        'tooltip': '1070',
      },
    },
  },
  plugins: [],
}

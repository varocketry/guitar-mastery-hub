// Guitar Mastery Hub - Design System Colors
// Based on Tony Polecastro style: tonypolecastro.com

export const colors = {
  // Backgrounds
  navy: {
    dark: '#0f172a',      // bg-slate-900 - main page backgrounds
    medium: '#1e293b',    // bg-slate-800 - secondary backgrounds
    light: '#334155',     // bg-slate-700 - buttons, nav items
  },
  
  // Content
  white: '#ffffff',       // Content cards
  
  // Text
  text: {
    dark: '#111827',      // text-gray-900 - headings
    body: '#1f2937',      // text-gray-800 - body text
    subtle: '#4b5563',    // text-gray-600 - subtle text
    light: '#9ca3af',     // text-gray-400 - very subtle
  },
  
  // Actions & Accents
  orange: {
    primary: '#f97316',   // bg-orange-500 - primary actions
    hover: '#ea580c',     // bg-orange-600 - hover states
    link: '#ea580c',      // text-orange-600 - links
  },
  
  // Status
  success: {
    primary: '#16a34a',   // bg-green-600 - success states
    hover: '#15803d',     // bg-green-700 - hover
  },
  
  error: {
    primary: '#dc2626',   // bg-red-600 - errors
    hover: '#b91c1c',     // bg-red-700 - hover
  },
  
  warning: {
    bg: '#fef3c7',        // bg-orange-50 - warning backgrounds
    border: '#f97316',    // border-orange-500 - warning borders
  }
} as const;

// Tailwind class strings for common patterns
export const styles = {
  pageBackground: 'min-h-screen bg-slate-900',
  contentCard: 'bg-white rounded-xl p-8 shadow-2xl',
  buttonPrimary: 'px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition shadow-lg',
  buttonSecondary: 'px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition',
  buttonSuccess: 'px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition shadow-lg',
  warningBox: 'bg-orange-50 border-l-4 border-orange-500 p-6 rounded',
  heading1: 'text-3xl font-bold text-gray-900 mb-6',
  heading2: 'text-2xl font-bold text-gray-900 mb-4',
  heading3: 'text-xl font-bold text-gray-900 mb-3',
  bodyText: 'text-gray-800',
  link: 'text-orange-600 hover:text-orange-700 underline',
} as const;

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
      },
      colors: {
        surface: {
          DEFAULT: '#0c0a12',
          elevated: '#14101f',
          card: 'rgba(255, 255, 255, 0.04)',
        },
        accent: {
          purple: '#a855f7',
          orange: '#f97316',
          glow: '#c084fc',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(ellipse at top, rgba(168, 85, 247, 0.15), transparent 50%)',
        'hero-mesh':
          'radial-gradient(at 20% 30%, rgba(168,85,247,0.25) 0px, transparent 50%), radial-gradient(at 80% 20%, rgba(249,115,22,0.2) 0px, transparent 45%), radial-gradient(at 50% 80%, rgba(168,85,247,0.1) 0px, transparent 40%)',
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0, 0, 0, 0.37)',
        glow: '0 0 40px rgba(168, 85, 247, 0.25)',
        'glow-orange': '0 0 30px rgba(249, 115, 22, 0.2)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}

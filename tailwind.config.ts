import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dental-blue': '#1B6FC9',
        'dental-blue-dark': '#1557B0',
        'dental-bg': '#FFFFFF',
        'dental-alt': '#F5F7FB',
        'dental-booking': '#EFF6FF',
        'dental-heading': '#111827',
        'dental-body': '#6B7280',
        'dental-border': '#E5E7EB',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'hero': ['3.5rem', { lineHeight: '1.1', fontWeight: '800' }],
        'section': ['2.5rem', { lineHeight: '1.2', fontWeight: '700' }],
        'stat': ['3rem', { lineHeight: '1', fontWeight: '800' }],
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(27, 111, 201, 0.08)',
        'card-hover': '0 20px 60px rgba(27, 111, 201, 0.15)',
        'blue': '0 4px 24px rgba(27, 111, 201, 0.25)',
      },
      backdropBlur: {
        'glass': '20px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'float-slow': 'float 8s ease-in-out 1s infinite',
        'float-slow2': 'float 8s ease-in-out 3s infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-blue': 'pulseBlue 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseBlue: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(27, 111, 201, 0.3)' },
          '50%': { boxShadow: '0 0 0 12px rgba(27, 111, 201, 0)' },
        },
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
}

export default config

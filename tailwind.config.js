/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './component/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: "var(--border)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideIn: {
          'from': {
            opacity: '0',
            transform: 'translateX(-20px)'
          },
          'to': {
            opacity: '1',
            transform: 'translateX(0)'
          }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        spin: {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' }
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.5' }
        }
      },
      animation: {
        'fadeIn': 'fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        'slideIn': 'slideIn 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        'float': 'float 3s ease-in-out infinite',
        'spin': 'spin 1s linear infinite',
        'spin-slow': 'spin 3s linear infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      }
    },
  },
  plugins: [],
}
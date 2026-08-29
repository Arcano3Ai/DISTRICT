/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        district: {
          cyan: '#00D2FF',
          lime: '#A8E063',
          teal: '#00C9A7',
          dark: '#0A0F1D',
          darker: '#060913',
          card: '#131B2E',
          cardLight: '#FFFFFF',
          accent: '#00F260',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'Outfit', 'sans-serif'],
      },
      backgroundImage: {
        'district-gradient': 'linear-gradient(135deg, #00D2FF 0%, #A8E063 100%)',
        'district-gradient-text': 'linear-gradient(90deg, #00D2FF 0%, #A8E063 100%)',
        'district-glow': 'radial-gradient(circle at center, rgba(0, 210, 255, 0.15) 0%, transparent 70%)',
      },
      boxShadow: {
        'glow-cyan': '0 0 25px rgba(0, 210, 255, 0.3)',
        'glow-lime': '0 0 25px rgba(168, 224, 99, 0.3)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      }
    },
  },
  plugins: [],
}

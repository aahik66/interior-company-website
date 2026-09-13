/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f15a24', // signature bdinterior terracotta orange
          600: '#e04712',
          700: '#c2380b',
          800: '#9a2d0c',
          900: '#7c270e',
          950: '#431105',
          navy: '#0b1325',
          midnight: '#050e18',
          accent: '#f7941d',
        },
      },
      animation: {
        marquee1: "marquee1 35s linear infinite",
        marquee2: "marquee2 35s linear infinite",
        floatSlow: "floatSlow 8s ease-in-out infinite",
        floatReverse: "floatReverse 11s ease-in-out infinite",
        pulseSlow: "pulseSlow 6s ease-in-out infinite",
        spinSlow: "spinSlow 45s linear infinite",
      },
      keyframes: {
        marquee1: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marquee2: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-18px) rotate(3deg)" },
        },
        floatReverse: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(16px) rotate(-4deg)" },
        },
        pulseSlow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.85" },
        },
        spinSlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
};
/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms';
import containerQueries from '@tailwindcss/container-queries';

export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#1162d4",
        "primary-dark": "#0d4ba3",
        "secondary": "#25D366",
        "background-light": "#ffffff",
        "background-subtle": "#f8fafd",
        "background-dark": "#101822",
        "neutral-100": "#f1f5f9",
        "neutral-200": "#e2e8f0",
        "neutral-300": "#cbd5e1",
        "neutral-600": "#475569",
        "neutral-800": "#1e293b",
      },
      fontFamily: {
        "display": ["Public Sans", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      boxShadow: {
        "soft": "0 4px 20px -2px rgba(17, 98, 212, 0.08)",
        "hover": "0 10px 25px -5px rgba(17, 98, 212, 0.15)",
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
      }
    },
  },
  plugins: [
    forms,
    containerQueries
  ],
}
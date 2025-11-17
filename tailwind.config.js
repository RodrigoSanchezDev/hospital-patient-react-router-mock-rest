/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb', // Blue
        secondary: '#059669', // Emerald green
        accent: '#f59e0b', // Amber for CTAs
      },
    },
  },
  plugins: [],
};

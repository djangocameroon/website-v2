/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        'primary': 'rgba(16, 62, 46, 1)',
        'primary-light': 'rgba(16, 62, 46, 0.1)',
        'primary-lighter': 'rgba(154, 176, 166, 1)',
        'secondary': 'rgba(66, 133, 244, 1)',
        'secondary-light': 'rgba(66, 133, 244, 0.1)',
        'dark-primary': '#C6EADE',
        'text-color': 'rgba(18, 18, 18, 1)',
        'grey': 'rgba(95, 99, 104, 1)'
      },
      boxShadow: {
        'shadow-outline': '0 0 6px 10px rgba(0,0,0,0.3)',
      },
    },
  },
  plugins: [],

  
};


/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        'primary': 'rgb(var(--color-primary) / <alpha-value>)',
        'primary-foreground': 'rgb(var(--color-primary-foreground) / <alpha-value>)',
        'primary-light': 'var(--color-primary-light)',
        'primary-lighter': 'rgb(var(--color-primary-lighter) / <alpha-value>)',
        'secondary': 'rgb(var(--color-secondary) / <alpha-value>)',
        'secondary-light': 'rgb(var(--color-secondary-light) / <alpha-value>)',
        'dark-primary': 'rgb(var(--color-dark-primary) / <alpha-value>)',
        'text-color': 'rgb(var(--color-text-color) / <alpha-value>)',
        'dark': 'rgb(var(--color-dark) / <alpha-value>)',
        'grey': 'rgb(var(--color-grey) / <alpha-value>)',
        'background': 'rgb(var(--color-background) / <alpha-value>)',
        'foreground': 'rgb(var(--color-foreground) / <alpha-value>)',
      },
      boxShadow: {
        'shadow-outline': '0 0 6px 10px rgba(0,0,0,0.3)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.4s ease-out forwards',
      },
    },
  },
  plugins: [],
};

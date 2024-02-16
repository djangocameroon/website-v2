/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary': 'rgba(16, 62, 46, 1)',
        'secondary': 'rgba(66, 133, 244, 1)',
        'dark-primary': '#C6EADE',
        'text-color': 'rgba(18, 18, 18, 1)',
      },
      boxShadow: {
        'shadow-outline': '0 0 6px 10px rgba(0,0,0,0.3)',
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require('daisyui')],

  daisyui: {
    themes: false, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: 'light', // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ':root', // The element that receives theme color CSS variables
  },
};


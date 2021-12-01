const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      'xs': { 'max': '475px' },
      'sm': { 'max': '640px' },
      'md': { 'max': '768px' },
      'lg': { 'max': '1024px' },
      'xl': { 'max': '1280px' },
    },
    extend: {
      backgroundImage: () => ({
        "login": "url('/img/home_plants.jpeg')",
        "google-icon": "url('/img/g-normal.png')",
        "plant-wall": "url('/img/plant_wall.jpg')",
        "albahaca": "url('/img/random/albahaca.jpg')",
        "hortensia": "url('/img/random/hortensia.jpg')",
        "jazmin": "url('/img/random/jazmin.jpg')",
        "palo-de-agua": "url('/img/random/palodeagua.jpg')",
        "petunias": "url('/img/random/petunias.jpg')",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

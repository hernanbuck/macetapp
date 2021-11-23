module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: () => ({
        "login": "url('/img/home_plants.jpeg')",
        "google-icon": "url('/img/g-normal.png')",
        "plant-1": "url('/img/users_1.jpg')",
        "plant-wall": "url('/img/plant_.jpg')",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

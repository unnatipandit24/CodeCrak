/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.tsx",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        brandBlack: "#050609",
        almond: "#f5d0c5",
        bronze: "#d69f7e",
        clay: "#774936",
        mahogany: "#3c0000",
      },
    },
  },
  plugins: [],
};

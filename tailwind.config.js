/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["TTNormsPro", "sans-serif"],
      },
    },
    fontSize: {
      base: "1rem",
    },
  },
  plugins: [],
};

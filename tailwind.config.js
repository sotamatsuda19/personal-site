/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Instrument Serif", "serif"],
        body: ["Bricolage Grotesque", "sans-serif"],
      },
      boxShadow: {
        glow: "0 10px 30px rgba(15, 23, 42, 0.10)",
      },
    },
  },
  plugins: [],
};

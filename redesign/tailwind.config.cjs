//tailwind.config.cjs
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",  
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {

      //We define our color variable here to be assigned a value on the stylesheet

      colors: {
        primary: "var(--color-primary)",
        largeText: "var(--color-large-text)",
        smallText: "var(--color-small-text)",
      },
    },
  },
  plugins: [],
}
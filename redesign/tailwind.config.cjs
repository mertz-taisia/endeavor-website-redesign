//tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",  
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {

      //We define our color variable here to be assigned a value on the stylesheet

      colors: {
        primary: "var(--color-primary)",
        testColor: "var(--color-bermuda)"
      },
    },
  },
  plugins: [],
}
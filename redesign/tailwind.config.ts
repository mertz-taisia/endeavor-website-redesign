import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class'],
  content: [
    "./index.html",  
    "./src/**/*.{js,jsx,ts,tsx}",
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
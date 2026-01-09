/** @type {import('tailwindcss').Config} */
export default {
  // Ensure Tailwind scans our Vite entry + all source files
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          orange: "#FF5733",
          dark: "#09090b",
        },
      },
    },
  },
  plugins: [],
}


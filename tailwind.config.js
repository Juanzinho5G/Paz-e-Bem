/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#faf5ff",
          100: "#f3e8ff",
          600: "#6B46C1",
          700: "#553C9A",
        },
        secondary: {
          500: "#319795",
          600: "#2C7A7B",
        },
      },
      borderRadius: {
        "3xl": "24px",
      },
    },
  },
  plugins: [],
};

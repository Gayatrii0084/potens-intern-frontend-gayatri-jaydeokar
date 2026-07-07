/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cockpit: {
          bg: "#F2F1EC",
          surface: "#FFFFFF",
          border: "#D9D6CE",
          primary: "#1B2A41",
          secondary: "#5C6470",
          navy: "#1E3A5F",
          "navy-hover": "#16293F",
        },
      },
      maxWidth: {
        cockpit: "1536px", /* 1440–1600px desktop container */
      },
    },
  },
  plugins: [],
}

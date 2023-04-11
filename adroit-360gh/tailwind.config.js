/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      backgroundColor: {
        primary: "#0E97BC",
        "main-bg": "#FAFBFB",
        "main-dark-bg": "#20232A",
        "secondary-dark-bg": "#33373E",
        "light-gray": "#F7F7F7",
        "half-transparent": "rgba(0, 0, 0, 0.5)",
      },
      width: {
        "40-r": "40rem",
        "35-r": "35rem",
        "30-r": "30rem",
        400: "400px",
        760: "760px",
        780: "780px",
        800: "800px",
        1000: "1000px",
        1200: "1200px",
        1400: "1400px",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      height: {
        "40-r": "40rem",
        "35-r": "35rem",
        "30-r": "30rem",
        "192-r": "48rem",
      },
      boxShadow: {
        "5xl": "20px 20px 50px rgba(0, 0,0,0,5)",
        "custom-right": "10px 0 20px -5px rgba(0,0,0,0.75);",
      },
    },
  },
  plugins: [],
};

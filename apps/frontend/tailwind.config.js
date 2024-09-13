module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./modules/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cresco: ["Roboto", "system-ui", "sans-serif"],
      },
      colors: {
        dark: "#3B3B3B",
        darkMilk: "#441D0D",
        light: "#FBFAFB",
        accent: "#DA9780",
        "cresco-violet": {
          DEFAULT: "#191446",
          800: "#191446",
          600: "#5F5B7F",
          400: "#807E9A",
          200: "#B3B2C2",
        },
        "cresco-green": {
          600: "#7C9943",
          DEFAULT: "#94B750",
          400: "#94B750",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

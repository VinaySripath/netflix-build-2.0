/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      mobile: "400px",
      tablet: "600px",
      laptop: "800px",
      desktop: "1080px",
    },
    fontSize: {
      48: "48px",
      24: "24px",
      16: "16px",
    },
    extend: {
      width: {
        42: "175px",
      },
      height: {
        34: "34px",
        128: "512px",
      },
      maxWidth: {
        160: "160px",
      },
      maxHeight: {
        300: "300px",
      },
      colors: {
        grey: {
          dark: "#333333",
          light: "#e6e6e6",
        },
      },
      zIndex: {
        max: "999999",
      },
      scale: {
        120: "1.2",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(180deg, #ffffff00 , #000000)",
      },
      backgroundSize: {
        secondary: "30% 100%, 70% 80%",
        primary: "40% 100%, 75% 100%",
      },
      backgroundPosition: {
        "top-right": "42.5%, right top",
        right: "41%, right",
      },
    },
  },
  plugins: [],
};

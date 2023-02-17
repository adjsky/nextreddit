/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      black: {
        500: "#161616",
        900: "#0f0f0f"
      },
      gray: {
        300: "#333333",
        500: "#1f1f1f",
        600: "#222222"
      },
      aqua: "#00FFFF",
      white: "#ffffff",
      green: "#5cff85",
      transparent: "transparent",
      current: "currentcolor"
    },
    extend: {
      fontFamily: {
        sans: [
          "var(--inter-font)",
          ...require("tailwindcss/defaultTheme").fontFamily.sans
        ]
      }
    }
  },
  future: {
    hoverOnlyWhenSupported: true
  }
}

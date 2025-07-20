  /** @type {import('tailwindcss').Config} */
  module.exports = {
    // NOTE: Update this to include the paths to all of your component files.
    content: ["./app/**/*.{js,jsx,ts,tsx}" , "./components/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
      extend: {
        colors : {
          primary : '#FFE700',
          secondary: "#ff8a05",
          tertiary:"#fffcc7",
          black: {
            DEFAULT: "#000",
            100: "#1E1E2D",
            200: "#232533",
          },
          gray: {
            100: "#CDCDE0",
          },
        },
        fontFamily: {
          fregular: ["Figtree-Regular", "sans-serif"],
          fbold: ["Figtree-Bold", "sans-serif"],
          fthin: ["Figtree-Thin", "sans-serif"],
          fextralight: ["Figtree-ExtraLight", "sans-serif"],
          flight: ["Figtree-Light", "sans-serif"],
          fmedium: ["Figtree-Medium", "sans-serif"],
          fsemibold: ["Figtree-SemiBold", "sans-serif"],
          fextrabold: ["Figtree-ExtraBold", "sans-serif"],
          fblack: ["Figtree-Black", "sans-serif"],
          dregualar: ["Dancing-ScriptRegualar", "sans-serif"],
        },
      },
    },
    plugins: [],
  }
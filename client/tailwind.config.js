/** @type {import('tailwindcss').Config} */
// const withMT = require("@material-tailwind/react/utils/withMT");
const colors = require('tailwindcss/colors')


module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        black: colors.black,
        white: colors.white,
        emerald: colors.emerald,
        indigo: colors.indigo,
        yellow: colors.yellow,
        // stone: colors.warmGray,
        // sky: colors.lightBlue,
        // neutral: colors.trueGray,
        // gray: colors.coolGray,
        // slate: colors.blueGray,
        neutral : colors.neutral
    },
    },
  },
  plugins: [],
};

// warn - As of Tailwind CSS v3.0, `warmGray` has been renamed to `stone`.  
// warn - Update your configuration file to silence this warning.

// warn - As of Tailwind CSS v2.2, `lightBlue` has been renamed to `sky`.   
// warn - Update your configuration file to silence this warning.

// warn - As of Tailwind CSS v3.0, `trueGray` has been renamed to `neutral`.
// warn - Update your configuration file to silence this warning.

// warn - As of Tailwind CSS v3.0, `coolGray` has been renamed to `gray`.   
// warn - Update your configuration file to silence this warning.

// warn - As of Tailwind CSS v3.0, `blueGray` has been renamed to `slate`.
// warn - Update your configuration file to silence this warning.

// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }



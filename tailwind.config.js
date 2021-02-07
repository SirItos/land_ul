const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./*.html', './src/*.js', './src/**/*.css', './src/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      primary: '#f1ece8',
      secondary: '#c2b8ac',
      black: colors.black,
      white: colors.white,
      green: colors.green,
      emerald: colors.emerald,
      teal: colors.teal,
      amber: colors.amber,
      accent: '#A67610',
      gray: colors.gray
    },
    minWidth: {
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      full: '100%'
    },
    extend: {
      fontFamily: {
        sf: ['"San Francisco Pro Display Regular"', 'sans-serif']
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}

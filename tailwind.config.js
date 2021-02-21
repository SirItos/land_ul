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
      orange: colors.orange,
      accent: '#A67610',
      gray: colors.gray,
      red: colors.red,
      brown: {
        DEFAULT: '#c3b0a2',
        light: '#c3b0a2',
        darken: '#52382b'
      }
    },
    minWidth: {
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      full: '100%'
    },
    maxWidth: {
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      full: '100%'
    },
    extend: {
      fontFamily: {
        sf: ['"San Francisco Pro Display Regular"', 'sans-serif']
      },
      boxShadow: {
        btn: '0 8px 15px 3px rgba(251, 146, 60, 0.3)'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}

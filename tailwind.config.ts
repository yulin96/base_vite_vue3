import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const convertUnit = (length = 100, name = 'px') =>
  Object.fromEntries(Array.from({ length: length + 1 }, (_, i) => [i, `${i}${name}`]))

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', './scan/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    spacing: convertUnit(100),
    extend: {
      width: convertUnit(1000),
      height: convertUnit(1000),
      fontSize: convertUnit(100),
      borderRadius: convertUnit(100),
      colors: {},
      animation: {
        'spin-slow': 'spin 4s linear infinite',
      },
    },
  },
  plugins: [
    plugin(({ addUtilities, addComponents }) => {
      addUtilities({
        '.paused': {
          'animation-play-state': 'paused',
        },
        '.running': {
          'animation-play-state': 'running',
        },
        '.text-last-center': {
          'text-align-last': 'center',
        },
      })
      addComponents({
        '.flex-center': {
          'display': 'flex',
          'justify-content': 'center',
          'align-items': 'center',
        },
        '.back-top': {
          'background-size': '100% auto',
          'background-repeat': 'no-repeat',
          'background-position': 'top',
        },
        '.back-bottom': {
          'background-size': '100% auto',
          'background-repeat': 'no-repeat',
          'background-position': 'bottom',
        },
      })
    }),
  ],
} satisfies Config

import type { Config } from 'tailwindcss'

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
  plugins: [],
} satisfies Config

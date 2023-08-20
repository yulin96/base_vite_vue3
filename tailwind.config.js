/** @type {import('tailwindcss').Config} */

const convertUnit = (length = 100, name = 'px') =>
  Object.fromEntries(Array.from({ length }, (_, i) => [++i, `${i}${name}`]))

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    spacing: convertUnit(),
    extend: {
      width: convertUnit(1000),
      fontSize: convertUnit(100, 'px'),
    },
  },
  plugins: [],
}

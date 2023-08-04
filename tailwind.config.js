/** @type {import('tailwindcss').Config} */

const createOption = (length) =>
  Array.from({ length }).reduce(
    (map, _, index) => {
      map[++index] = `${index}px`
      return map
    },
    { 0: '0' }
  )

module.exports = {
  content: ['./src/**/*.{html,js,ts,vue,jsx,tsx}'],
  theme: {
    extend: {
      spacing: createOption(100),
      width: createOption(1000),
      height: createOption(1000),
      fontSize: createOption(100),
      keyframes: {
        rotate360: {
          ' 0%': { transform: 'rotate(0)' },
          '100% ': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        rotate360: 'rotate360 4s linear infinite',
      },
    },
  },
  plugins: [],
}

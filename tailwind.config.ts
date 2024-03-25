import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const convertUnit = (length = 100, name = 'px') =>
  Object.fromEntries(Array.from({ length: length + 1 }, (_, i) => [i, `${i}${name}`]))

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    spacing: convertUnit(100),
    extend: {
      width: convertUnit(1000),
      height: convertUnit(1000),
      fontSize: convertUnit(100),
      borderRadius: convertUnit(100),
      colors: {
        primary: '#fff',
      },
      animation: {
        'spin-slow': 'spin 4s linear infinite',
        'heart-beat': 'heartBeat_k 1.5s 0.3s ease-in-out infinite',
      },
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'none', 'animation-timing-function': 'cubic-bezier(0,0,0.2,1)' },
          '50%': { transform: 'translateY(-25%)', 'animation-timing-function': 'cubic-bezier(0.8,0,1,1)' },
        },
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
        '.text-last-justify': {
          'text-align-last': 'justify',
        },
        '.flash': {} /* 流光动画 */,
        '.flash-play': {} /* 流光动画播放 */,
        /* vant */
        '.van-hairline--top': {},
        '.van-hairline--bottom': {},
        '.van-hairline--left': {},
        '.van-hairline--right': {},
        '.van-hairline--top-bottom': {},
        '.van-hairline--surround': {},
      })
      addComponents({
        /* base */
        '.center': {
          display: 'flex',
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
        '.expand': {
          position: 'relative',
          '&::before': {
            content: "''",
            position: 'absolute',
            inset: '-20px',
          },
        },
        '.haptic': {
          cursor: 'pointer',
          '&::active': {
            opacity: '.6',
          },
        },
      })
    }),
  ],
} satisfies Config

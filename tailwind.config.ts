import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const convertUnit = (length = 100, name = 'px') =>
  Object.fromEntries(Array.from({ length: length + 1 }, (_, i) => [i, `${i}${name}`]))

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    spacing: convertUnit(200),
    extend: {
      width: convertUnit(1000),
      height: convertUnit(1000),
      fontSize: convertUnit(100),
      borderRadius: convertUnit(100),
      colors: {
        primary: '#fff',
        danger: '#ee0a24',
        placeholder: '#a3a9b5',
      },
      keyframes: {
        handle: {
          '0%,30%,100%': { transform: 'scale(1)' },
          '15%': { transform: 'scale(0.96)' },
        },
        bounce: {
          '0%, 100%': { transform: 'none', 'animation-timing-function': 'cubic-bezier(0,0,0.2,1)' },
          '50%': { transform: 'translateY(-25%)', 'animation-timing-function': 'cubic-bezier(0.8,0,1,1)' },
        },
      },
      animation: {
        'spin-slow': 'spin 4s linear infinite',
        'heart-beat': 'heartBeat_k 1.5s 0.3s ease-in-out infinite',
        handle: 'handle 1s ease infinite',
      },
    },
  },
  plugins: [
    plugin(({ addUtilities, addComponents, matchUtilities }) => {
      addUtilities({
        '.text-security-disc': {
          '-webkit-text-security': 'disc',
        },
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
        '.touch-callout': {
          '-webkit-touch-callout': 'default',
        },
        '.shark-wrap': {} /* 流光动画 */,
        '.shark-wrap-play': {} /* 流光动画播放 */,
        '.shark-text': {},
        '.shark-text-play': {
          'animation-play-state': 'running !important',
        } /* 流光文字动画 */,
        '.mask': {},
        '.time': {},
        '.loquat': {},
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
      matchUtilities({
        time: (value) => ({
          '--time': value,
        }),
        'shark-text': (value) => ({
          color: 'transparent',
          background: `linear-gradient(45deg, #ffffff00 30%, #ffffffe6, #ffffff00 70%) -100% / 50% no-repeat ${value}`,
          'background-clip': 'text',
          animation: `shark-text var(--time, 2s) infinite paused`,
        }),
        mask: (value) => ({
          '-webkit-mask': `${value} 0 0/100%`,
          mask: `${value} 0 0/100%`,
        }),
      })
    }),
  ],
} satisfies Config

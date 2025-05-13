import gsap from '@/tools/pip/gsap'

export const quickShakeX = (query: string, repeat?: number, repeatDelay?: number) => {
  const item = document.querySelector(query)
  if (!item) return

  gsap.to(item, {
    keyframes: {
      x: [0, -10, 10, -10, 10, 0],
    },
    duration: 1,
    repeat: repeat,
    repeatDelay: repeatDelay,
  })
}

export const quickTada = (query: string, repeat?: number, repeatDelay?: number) => {
  const item = document.querySelector(query)
  if (!item) return

  gsap.to(item, {
    keyframes: {
      scale: [1, 0.9, 0.9, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1],
      rotate: [0, -3, -3, 3, -3, 3, -3, 3, -3, 3, 0],
    },
    duration: 1,
    repeat: repeat,
    repeatDelay: repeatDelay,
  })
}

export const quickWobble = (query: string, repeat?: number, repeatDelay?: number) => {
  const item = document.querySelector(query)
  if (!item) return

  gsap.to(item, {
    transformOrigin: '50% 100%',
    keyframes: {
      x: [0, '-25%', '20%', '-15%', '10%', '-5%', 0, 0],
      rotate: [0, -5, 3, -3, 2, -1, 0, 0],
    },
    duration: 1,
    repeat: repeat,
    repeatDelay: repeatDelay,
  })
}

export const quickJello = (query: string, repeat?: number, repeatDelay?: number) => {
  const item = document.querySelector(query)
  if (!item) return

  gsap.to(item, {
    keyframes: {
      skewX: [0, 0, -12.5, 6.25, -3.125, 1.5625, -0.78125, 0.390625, -0.1953125, 0],
      skewY: [0, 0, -12.5, 6.25, -3.125, 1.5625, -0.78125, 0.390625, -0.1953125, 0],
    },
    duration: 1,
    repeat: repeat,
    repeatDelay: repeatDelay,
  })
}

export const quickSwing = (query: string, repeat?: number, repeatDelay?: number) => {
  const item = document.querySelector(query)
  if (!item) return

  gsap.to(item, {
    transformOrigin: '50% 0%',
    keyframes: {
      rotate: [0, 15, -10, 5, -5, 0],
    },
    duration: 1,
    repeat: repeat,
    repeatDelay: repeatDelay,
  })
}

import confetti from 'canvas-confetti'

export const showConfetti = () => {
  confetti({
    particleCount: 120,
    spread: 70,
    angle: -90,
    origin: { y: -0.6 },
    // colors: ['#fff', '#091f86', '#091f86', '#fbe1b7', '#fdd0bd', '#f1f1f1'],
  })
}

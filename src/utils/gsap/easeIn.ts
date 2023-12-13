import { gsap } from 'gsap'

gsap.registerEffect({
  name: 'easeIn',
  effect: (targets: string, config: object) =>
    gsap.from(targets, {
      y: 50,
      filter: 'blur(10px)',
      opacity: 0,
      z: 0,
      stagger: 0.06,
      ...config,
    }),
  defaults: { duration: 0.6, delay: -0.2, ease: 'expo.out' },
  extendTimeline: true,
})

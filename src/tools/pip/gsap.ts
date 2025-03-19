import _gsap from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'

_gsap.registerPlugin(MotionPathPlugin)
_gsap.registerPlugin(TextPlugin)
_gsap.registerPlugin(ScrollTrigger)

_gsap.config({ force3D: true })
_gsap.defaults({
  duration: 0.36,
  ease: 'power1.out',
})

export const gsap = _gsap

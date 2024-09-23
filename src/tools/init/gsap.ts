import gsap from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'

gsap.registerPlugin(MotionPathPlugin)
gsap.registerPlugin(TextPlugin)
gsap.registerPlugin(ScrollTrigger)

gsap.config({ force3D: true })
gsap.defaults({
  duration: 0.36,
  ease: 'power1.out',
})

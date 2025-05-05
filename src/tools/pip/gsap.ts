import { gsap } from 'gsap'

// import './gsap-register/drawSVGPlugin'
// import './gsap-register/motionPathPlugin'
// import './gsap-register/scrambleTextPlugin'
// import './gsap-register/scrollSmoother'
// import './gsap-register/scrollTrigger'
// import './gsap-register/splitText'

gsap.config({ force3D: true })
gsap.defaults({
  duration: 0.36,
  ease: 'power1.out',
  overwrite: 'auto',
})

export default gsap

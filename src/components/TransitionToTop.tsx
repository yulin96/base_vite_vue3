import { Transition, defineComponent } from 'vue'
import './style/TransitionToTop.css'

export default defineComponent((_, { slots }) => {
  return () => (
    <Transition name='slide-up' mode='out-in'>
      {slots.default?.()}
    </Transition>
  )
})

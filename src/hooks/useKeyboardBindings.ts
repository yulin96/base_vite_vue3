import { onMounted, onUnmounted } from 'vue'

interface KeyboardBindings {
  [x: string]: () => void
}

export const useKeyboardBindings = (map: KeyboardBindings) => {
  const handlePress = (ev: KeyboardEvent) => {
    const handler = map[ev.key]
    if (typeof handler === 'function') {
      handler()
    }
  }
  onMounted(() => {
    window.addEventListener('keyup', handlePress)
  })
  onUnmounted(() => {
    window.removeEventListener('keyup', handlePress)
  })
}

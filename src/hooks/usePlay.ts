import { ref } from 'vue'

export const usePlay = () => {
  const play = ref(false)

  const togglePlay = (toggle?: boolean) => {
    play.value = toggle ?? true
  }

  return [play, togglePlay]
}

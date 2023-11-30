import { ref } from 'vue'

export const usePlay = (paly?: boolean) => {
  const play = ref(paly ?? false)

  const togglePlay = (toggle?: boolean) => {
    play.value = toggle ?? true
  }

  return [play, togglePlay] as [typeof play, typeof togglePlay]
}

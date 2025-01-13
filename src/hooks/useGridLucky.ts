import { readonly, ref } from 'vue'

export function useGridLucky() {
  const currentId = ref<number>()

  const isLottery = ref(false)

  let timer: NodeJS.Timeout
  const start = () => {
    if (isLottery.value) return

    timer = setInterval(() => {
      currentId.value ? (currentId.value = ++currentId.value % 8) : (currentId.value = 0)
    }, 200)
  }

  return { currentId, isLottery: readonly(isLottery), start }
}

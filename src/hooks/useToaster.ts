import { ref } from 'vue'
import { createToaster } from '~/tools/user/createToaster'

export function useToaster(loadingInfo: string) {
  const isProcessing = ref(false)

  function createToast(delay = 500) {
    isProcessing.value = true

    const [resolve, reject, promise] = createToaster(loadingInfo)
    promise.finally(() =>
      setTimeout(() => {
        isProcessing.value = false
      }, delay),
    )

    return [resolve, reject] as const
  }

  return [isProcessing, createToast] as const
}

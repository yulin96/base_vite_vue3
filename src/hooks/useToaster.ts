import { createToaster } from '@/tools/user/createToaster'
import { readonly, shallowRef } from 'vue'

export function useToaster(loadingInfo: string) {
  const isProcessing = shallowRef(false)

  function createToast(delay = 500) {
    isProcessing.value = true

    const { promise, resolve, reject } = createToaster(loadingInfo)
    promise.finally(() =>
      setTimeout(() => {
        isProcessing.value = false
      }, delay),
    )

    return [resolve, reject] as const
  }

  return [readonly(isProcessing), createToast] as const
}

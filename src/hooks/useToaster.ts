import { toast } from 'vue-sonner'
import { usePromise } from '~/hooks/usePromise'

export function useToaster(loadingInfo: string) {
  const isProcessing = ref(false)

  function createToast(delay = 500) {
    const [promise, resolve, reject] = usePromise<string>()
    let toastTimeout: NodeJS.Timeout | undefined = undefined

    isProcessing.value = true
    const toastId = toast.promise(promise, {
      loading: loadingInfo,
      finally: () => {
        clearTimeout(toastTimeout)

        setTimeout(() => {
          isProcessing.value = false
        }, delay)
      },
      success: (e) => e,
      error: (e) => e,
    })

    toastTimeout = setTimeout(() => {
      toast.dismiss(toastId)
    }, 30000)

    return [resolve, reject] as const
  }

  return [isProcessing, createToast] as const
}

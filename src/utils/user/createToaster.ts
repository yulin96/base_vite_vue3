import { usePromise } from '@/hooks/usePromise'
import { toast } from 'vue-sonner'

export function createToaster(loadingInfo: string) {
  const { promise, resolve, reject } = usePromise<string>()
  let toastTimeout: NodeJS.Timeout | undefined = undefined

  const toastId = toast.promise(promise, {
    loading: loadingInfo,
    finally: () => {
      clearTimeout(toastTimeout)
    },
    success: (e: string) => e,
    error: (e: string) => e,
    duration: 600,
  })

  toastTimeout = setTimeout(() => {
    toastId && toast.dismiss()
  }, 12000)

  return { promise, resolve, reject, toastId }
}

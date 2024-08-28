import { toast } from 'vue-sonner'
import { usePromise } from '../utils/common'

export function useToaster(loadingInfo: string) {
  const [promise, resolve, reject] = usePromise<string>()

  const toastTimeout = setTimeout(() => {
    reject()
  }, 30000)

  toast.promise(promise, {
    loading: loadingInfo,
    finally: () => {
      clearTimeout(toastTimeout)
    },
    success: (e) => e,
    error: (e) => e,
  })

  return [resolve, reject as (value: string) => void] as const
}

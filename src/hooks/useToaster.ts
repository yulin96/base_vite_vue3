import { toast } from 'vue-sonner'
import { usePromise } from '../utils/common'

export function useToaster(loadingInfo: string, successInfo: string, errorInfo?: string) {
  const [promise, resolve, reject] = usePromise()

  const _timer = setTimeout(() => {
    reject()
  }, 30000)

  toast.promise(promise, {
    loading: loadingInfo,
    finally: () => {
      clearTimeout(_timer)
    },
    success: () => successInfo,
    ...(errorInfo
      ? {
          error: () => errorInfo,
        }
      : {}),
  })

  return [resolve, reject]
}

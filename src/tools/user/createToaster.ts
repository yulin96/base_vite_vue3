import { toast } from 'vue-sonner'

export function createToaster(loadingInfo: string) {
  const [promise, resolve, reject] = usePromise<string>()
  let toastTimeout: NodeJS.Timeout | undefined = undefined

  const toastId = toast.promise(promise, {
    loading: loadingInfo,
    finally: () => {
      clearTimeout(toastTimeout)
    },
    success: (e) => e,
    error: (e) => e,
  })

  toastTimeout = setTimeout(() => {
    toastId && toast.dismiss()
  }, 30000)

  return [resolve, reject, promise] as const
}

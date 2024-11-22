import { ref } from 'vue'

export function usePromise<T>() {
  const isPending = ref(true)

  let resolve: (value: T) => void = () => {}
  let reject: (err?: any) => void = () => {}

  const promise = new Promise<T>((_resolve, _reject) => {
    resolve = _resolve
    reject = _reject
  })

  promise.finally(() => (isPending.value = false))

  return [promise, resolve, reject, isPending] as const
}

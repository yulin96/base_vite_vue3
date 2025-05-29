import { readonly, shallowRef, type Ref } from 'vue'

export interface UsePromiseReturn<T> {
  promise: Promise<T>
  resolve: (value: T | PromiseLike<T>) => void
  reject: (reason?: any) => void
  isPending: Readonly<Ref<boolean>>
  isResolved: Readonly<Ref<boolean>>
  isRejected: Readonly<Ref<boolean>>
  reset: () => UsePromiseReturn<T>
}

export function usePromise<T = never>(): UsePromiseReturn<T> {
  const isPending = shallowRef(true)
  const isResolved = shallowRef(false)
  const isRejected = shallowRef(false)

  let resolve: (value: T | PromiseLike<T>) => void
  let reject: (reason?: any) => void

  const promise = new Promise<T>((_resolve, _reject) => {
    resolve = (value: T | PromiseLike<T>) => {
      if (!isPending.value) return // 防止重复调用
      isPending.value = false
      isResolved.value = true
      _resolve(value)
    }

    reject = (reason?: any) => {
      if (!isPending.value) return // 防止重复调用
      isPending.value = false
      isRejected.value = true
      _reject(reason)
    }
  })

  const reset = (): UsePromiseReturn<T> => {
    return usePromise<T>()
  }

  return {
    promise,
    resolve: resolve!,
    reject: reject!,
    isPending: readonly(isPending),
    isResolved: readonly(isResolved),
    isRejected: readonly(isRejected),
    reset,
  }
}

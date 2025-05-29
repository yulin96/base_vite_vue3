import { readonly, shallowRef } from 'vue'

export function userLock() {
  const status = shallowRef(false)

  const lock = () => {
    status.value = true
  }

  const unLock = () => {
    status.value = false
  }

  return [readonly(status), lock, unLock] as const
}

import { readonly, ref } from 'vue'

export function userLock() {
  const status = ref(false)

  const lock = () => {
    status.value = true
  }

  const unLock = () => {
    status.value = false
  }

  return [readonly(status), lock, unLock] as const
}

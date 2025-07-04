import type { ResData } from '@/api/types'
import { useLockRequest } from '@/hooks/useLockRequest'

const { get: getMenus } = useLockRequest()
export const apiMenus = (title: string) => {
  type T = {
    title: string
    status: number
    url: string
    remark: string
  }
  return new Promise<[boolean, T | null]>((resolve) => {
    getMenus<ResData<T>>('https://cdeapi.event1.cn/api/cmenu', { title })
      .then((res) => {
        resolve([res.data?.status == 1, res.data])
      })
      .catch(() => {
        resolve([false, null])
      })
  })
}

import { useUrlSearchParams } from '@vueuse/core'
import { useLock } from '~/hooks/useLock'
import { useStore } from '~/stores'

/**
 * 获取微信用户openid
 * @param name 平台名称
 * @returns 是否获取成功
 */
export function getOpenId(): Promise<boolean | void> {
  return new Promise<boolean>((resolve) => {
    const { user } = useStore()
    if (user.wxInfo?.openid) return resolve(true)
    const params = useUrlSearchParams()
    const proid = params?.proid
    if (proid) {
      useLock()
        .post('https://wechat.event1.cn/api/getCode', { proid })
        .then((res: Record<string, any>) => {
          if (!res.data?.openid) return resolve(false)
          Object.assign(user.wxInfo, res.data)
          resolve(true)
        })
        .catch(() => {
          resolve(false)
        })
    } else {
      resolve(false)
    }
  })
}

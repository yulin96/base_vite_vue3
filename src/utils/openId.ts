/**
 *
 * @param id 活动id
 * @param name? 授权公众号名称
 * @returns {Promise<boolean | void>} 获取是否成功
 */

const { get } = useLock()

export const getOpenId = (name = '互动微平台', id?: string): Promise<boolean | void> => {
  return new Promise<any>((resolve) => {
    const { user } = useStore()
    if (user?.wxInfo?.openid) return resolve(true)
    const params = useUrlSearchParams()
    const code = params?.code
    if (code) {
      get('https://center-service.event1.cn/wechat/user', { name, code })
        .then((res) => {
          if (!res.data?.openid) return resolve(false)
          user.wxInfo = res.data
          resolve(true)
        })
        .catch(() => {
          resolve(false)
        })
    } else {
      resolve(false)
      // location.href =
      //   'https://wechat-oauth.event1.cn/wechat/code?name=' + name + '&state=' + id + '&type=2'
    }
  })
}

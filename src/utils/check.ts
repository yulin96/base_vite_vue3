/**
 *
 * @param str 字符串
 * @returns {boolean} - 如果是中文则返回 true，否则返回 false
 */
export function isNickName(str: string): boolean {
  return /^[A-Za-z0-9]+$/.test(str)
}

/**
 *
 * @param email 邮箱
 * @returns {boolean} - 如果是邮箱则返回 true，否则返回 false
 */
export function isEmail(email: string): boolean {
  return /(\S)+[@]{1}(\S)+[.]{1}(\w)+/.test(email)
}

/**
 *
 * @param phone 手机号
 * @returns {boolean} - 如果是手机号则返回 true，否则返回 false
 */
export function isPhone(phone: string): boolean {
  return /^1[3-9]\d{9}$/.test(phone)
}

/**
 *
 * @param idCard 身份证号
 * @returns {boolean | void} - 如果是身份证号则返回 true，否则返回 false
 */
export function isIdCard(idCard: string): boolean | void {
  const regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
  // 如果通过该验证，说明身份证格式正确，但准确性还需计算
  if (regIdCard.test(idCard)) {
    if (idCard.length == 18) {
      const idCardWi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2] // 将前17位加权因子保存在数组里
      const idCardY = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2] // 这是除以11后，可能产生的11位余数、验证码，也保存成数组
      let idCardWiSum = 0 // 用来保存前17位各自乖以加权因子后的总和
      for (let i = 0; i < 17; i++) {
        idCardWiSum += +idCard.substring(i, i + 1) * idCardWi[i]
      }
      const idCardMod = idCardWiSum % 11 // 计算出校验码所在数组的位置
      const idCardLast = idCard.substring(17) // 得到最后一位身份证号码

      // 如果等于2，则说明校验码是10，身份证号码最后一位应该是X
      if (idCardMod == 2) {
        if (idCardLast == 'X' || idCardLast == 'x') {
          return true
        } else {
          return false
        }
      } else {
        // 用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
        if (idCardLast == String(idCardY[idCardMod])) {
          return true
        } else {
          return false
        }
      }
    }
  } else {
    return false
  }
}

/**
 * 判断当前页面是否使用 HTTPS 协议
 * @returns {boolean} - 如果是 HTTPS 协议则返回 true，否则返回 false
 */
export function isHttps(): boolean {
  return location.protocol === 'https:'
}

/**
 * 判断当前系统是否开启了深色模式
 * @type {boolean} - 如果开启了深色模式则为 true，否则为 false
 */
export const isDarkMode: boolean = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

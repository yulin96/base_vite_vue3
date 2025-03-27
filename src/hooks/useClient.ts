import { useDocumentVisibility } from '@vueuse/core'
import { readonly, shallowRef, watch } from 'vue'

// 为ROP全局对象定义类型
declare global {
  interface Window {
    ROP: {
      On: (event: string, callback: (data: any, topic: string) => void) => void
      Enter: (pub: string, sub: string, suid: string, boolean: boolean) => void
      Subscribe: (topic: string) => void
      Publish: (topic: string, message: string) => void
    }
  }
}

/**
 * ROP客户端连接钩子
 * @param subScribes 订阅的主题，可以是字符串或字符串数组
 * @param pub 发布频道
 * @param sub 订阅频道
 * @returns 包含接收数据的响应式引用
 */
export const useClient = <T = any>(
  subScribes: Array<string> | string,
  pub: string,
  sub: string,
) => {
  const subIsString = typeof subScribes === 'string'
  const data = shallowRef<T>()

  // 重试延迟时间（毫秒）
  const RETRY_DELAY = 2000

  // 生成唯一会话ID
  const generateSessionId = () => `suid_${Date.now()}${Math.floor(Math.random() * 1_000_000_000)}`

  const ROPReady = () => {
    const ROP = window.ROP

    // 事件处理函数注册
    ROP.On('enter_suc', () => {
      console.log('连接成功')
    })

    ROP.On('reconnect', () => {
      console.log('重连中')
    })

    ROP.On('offline', (err: string) => {
      console.error('离线状态:', err)
      setTimeout(linkROP, RETRY_DELAY)
    })

    ROP.On('enter_fail', (err: string) => {
      console.error('登录失败:', err)
    })

    ROP.On('publish_data', (message: any, topic: string) => {
      // 只处理订阅的主题消息
      if ((subIsString ? topic === subScribes : subScribes.includes(topic)) && message) {
        try {
          const parsedMessage = JSON.parse(message)

          // 数据类型检查
          if (typeof parsedMessage !== 'object' || parsedMessage === null) {
            console.warn('收到的消息不是对象类型:', parsedMessage)
          } else {
            data.value = parsedMessage as T
          }
        } catch (error) {
          console.error('JSON解析失败:', error)
        }
      }
    })

    ROP.On('losed', () => {
      console.error('连接已断开')
      setTimeout(linkROP, RETRY_DELAY)
    })

    // 连接函数
    function linkROP() {
      try {
        // 进入频道
        ROP.Enter(pub, sub, generateSessionId(), true)

        // 订阅主题
        if (subIsString) {
          ROP.Subscribe(subScribes as string)
        } else {
          ;(subScribes as string[]).forEach((topic) => ROP.Subscribe(topic))
        }
      } catch (error) {
        console.error('连接失败:', error)
      }
    }

    // 初始连接
    linkROP()

    // 监听页面可见性变化，在页面变为可见时重新连接
    const visibility = useDocumentVisibility()
    watch(visibility, (newVisibility) => {
      if (newVisibility === 'visible') linkROP()
    })
  }

  // 加载或使用ROP客户端
  if (typeof window.ROP !== 'undefined') {
    ROPReady()
  } else {
    const ropScript = document.createElement('script')
    ropScript.src = 'https://cdn.aodianyun.com/dms/rop_client.js'
    ropScript.type = 'text/javascript'
    ropScript.onload = ROPReady
    document.head.appendChild(ropScript)
  }

  return { data: readonly(data) }
}

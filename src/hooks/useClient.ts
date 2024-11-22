import { useDocumentVisibility } from '@vueuse/core'
import { ref, watch } from 'vue'

export const useClient = (subScribes: Array<string> | string, pub: string, sub: string) => {
  const subIsString = typeof subScribes === 'string'

  const data = ref()

  const ROPReady = () => {
    ROP.On('enter_suc', () => {
      console.log('连接成功')
    })

    // 重连中
    ROP.On('reconnect', () => {
      console.log('重连中')
    })

    // 离线状态，之后会重连
    ROP.On('offline', (err: string) => {
      console.error('离线!!', err)
      setTimeout(() => {
        linkROP()
      }, 2000)
    })

    // 登陆失败
    ROP.On('enter_fail', (err: string) => {
      console.error('登陆失败', err)
    })

    // 收到消息
    ROP.On('publish_data', (message: string, topic: string) => {
      if ((subIsString ? topic === subScribes : subScribes.includes(topic)) && message) {
        try {
          const _message = JSON.parse(message)
          if (['number', 'string'].includes(typeof _message))
            console.warn('收到消息,类型非object', _message)
          data.value = _message
        } catch (error) {
          console.log('已连接 , 解析为json失败', error)
        }
      } else {
        console.log('连接成功.2', message)
      }
    })

    // 彻底断线了
    ROP.On('losed', () => {
      console.error('断线')

      setTimeout(() => {
        linkROP()
      }, 2000)
    })

    function Publish() {
      // ROP.Publish()
    }

    function OnEnter() {
      ROP.Enter(pub, sub, 'suid_' + +new Date() + Math.floor(Math.random() * 1_000_000_000), true)
    }

    function OnJoin() {
      subIsString
        ? ROP.Subscribe(subScribes)
        : subScribes.forEach((item) => {
            ROP.Subscribe(item)
          })
    }

    linkROP()

    const visibility = useDocumentVisibility()
    watch(visibility, (nv) => {
      if (nv === 'visible') linkROP()
    })

    function linkROP() {
      try {
        OnEnter()
        OnJoin()
      } catch (error) {
        console.error(error, '🔗 🐛')
      }
    }
  }

  if (typeof ROP !== 'undefined') {
    ROPReady()
  } else {
    const rop_client = document.createElement('script')
    rop_client.src = 'https://cdn.aodianyun.com/dms/rop_client.js'
    rop_client.type = 'text/javascript'
    rop_client.onload = ROPReady
    document.head.appendChild(rop_client)
  }

  return { data }
}

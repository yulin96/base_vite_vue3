import { ref } from 'vue'

export const useClient = (
  subScribes: Array<string> | string,
  pub = 'pub_3dc08e65ff36ed08185a82db5091922c',
  sub = 'sub_1717bad8d0d7e9716e992f816f563898',
) => {
  const subIsString = typeof subScribes === 'string'

  const data = ref()

  const onload = () => {
    ROP.On('enter_suc', function () {
      console.log('连接成功')
    })
    // 重连中
    ROP.On('reconnect', function () {
      console.log('重连中')
    })
    // 离线状态，之后会重连
    ROP.On('offline', function (err: any) {
      console.log('离线!!')
      setTimeout(() => {
        OnEnter()
        OnJoin()
      }, 2000)
    })
    // 登陆失败
    ROP.On('enter_fail', function (err: any) {
      console.log('登陆失败')
    })
    // 收到消息
    ROP.On('publish_data', function (res: any, topic: any) {
      if ((subIsString ? topic === subScribes : subScribes.includes(topic)) && res) {
        try {
          const _data = JSON.parse(res)
          if (typeof res === 'number') throw new Error(res.toString())
          data.value = _data
        } catch (error) {
          console.log('已连接 , 解析为json失败', error)
        }
      } else {
        console.log('连接成功.2', res)
      }
    })
    // 彻底断线了
    ROP.On('losed', function () {
      console.log('短线')

      setTimeout(() => {
        OnEnter()
        OnJoin()
      }, 2000)
    })

    function Publish() {
      // ROP.Publish()
    }

    function OnEnter() {
      const num = Math.floor(Math.random() * (1 - 289207) + 289207)
      ROP.Enter(pub, sub, 'suid_' + num, true)
    }

    function OnJoin() {
      subIsString
        ? ROP.Subscribe(subScribes)
        : subScribes.forEach((item) => {
            ROP.Subscribe(item)
          })
    }

    OnEnter()
    OnJoin()

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState == 'visible') {
        OnEnter()
        OnJoin()
      }
    })
  }

  const rop_client = document.createElement('script')
  rop_client.src = 'https://cdn.aodianyun.com/dms/rop_client.js'
  rop_client.type = 'text/javascript'
  document.body.appendChild(rop_client)
  rop_client.onload = onload

  return { data }
}

// 使用方法

// const { data } = useClient(
//   ['cde_yulin0116'],
//   'pub_3dc08e65ff36ed08185a82db5091922c',
//   'sub_1717bad8d0d7e9716e992f816f563898',
// )

// watch(data, (newVal) => {
//   console.log('newVal', newVal);
// })

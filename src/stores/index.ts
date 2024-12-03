import { defineStore } from 'pinia'
import { reactive } from 'vue'

interface IIgnore {
  [key: string]: any
}
interface IInfo {
  [key: string]: any
}
interface IWxInfo {
  openid: string
  nickname: string
  avatar: string
}

export const useStore = defineStore(
  'user',
  () => {
    const user = reactive({
      code: '',

      info: {} as Partial<IInfo>,
      wxInfo: {} as Partial<IWxInfo>,

      clear() {
        Object.keys(this).forEach((key) => {
          const element = this[key]

          if (element == null) {
            this[key] = null
            return
          }
          switch (typeof element) {
            case 'string':
              this[key] = ''
              break
            case 'number':
              this[key] = 0
              break
            case 'boolean':
              this[key] = false
              break
            case 'object':
              this[key] = Array.isArray(element) ? [] : {}
              break
          }
        })
      },

      other: {} as Partial<{ [key: string]: any }>,
      ignore: {} as Partial<IIgnore>,
    })

    return { user }
  },
  {
    persist: {
      key: import.meta.env.VITE_APP_LOCALSTORAGE_NAME || 'test',
      pick: undefined,
      omit: ['user.ignore'],
    },
  },
)

import { cloneDeep } from 'es-toolkit'
import { defineStore } from 'pinia'
import { ref } from 'vue'

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
    const originData = {
      code: '',
      info: {} as Partial<IInfo>,
      wxInfo: {} as Partial<IWxInfo>,
      bb: false,
      aa: true,

      backXY: { x: -12, y: innerHeight - 200 },
      other: {} as Partial<{ [key: string]: any }>,
      ignore: {} as Partial<IIgnore>,
    }

    const user = ref(cloneDeep(originData))

    const $reset = () => {
      user.value = cloneDeep(originData)
    }

    return { user, $reset }
  },
  {
    persist: {
      key: import.meta.env.VITE_APP_LOCALSTORAGE_NAME || 'test',
      pick: undefined,
      omit: ['user.ignore'],
    },
  },
)

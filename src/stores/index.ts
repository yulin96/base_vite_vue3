import { defineStore } from 'pinia'

interface IInfo {
  name: string
  phone: string
  code: string
  [x: string]: any
}

interface IWxInfo {
  openid: string
  nickname: string
  portrait: string
}

interface IUserStore {
  info: Partial<IInfo>
  wxInfo: Partial<IWxInfo>
  [x: string]: any
}

export const useStore = defineStore(
  'user',
  () => {
    const user = reactive<IUserStore>({ info: {}, wxInfo: {} })

    const clearUser = () => {
      user.info = {}
      user.wxInfo = {}
    }

    return { user, clearUser }
  },
  {
    persist: {
      key: import.meta.env.VITE_APP_LOCALSTORAGE_NAME || 'test',
      paths: undefined,
      beforeRestore: () => {},
      debug: true,
    },
  },
)

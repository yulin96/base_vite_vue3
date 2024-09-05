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
  ignore: Record<string, any>
  [x: string]: any
}

export const useStore = defineStore(
  'user',
  () => {
    const user = reactive<IUserStore>({ info: {}, wxInfo: {}, ignore: {} })

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

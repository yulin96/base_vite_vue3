interface IUserInfo {
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
  userInfo: Partial<IUserInfo>
  wxInfo: Partial<IWxInfo>
  [x: string]: any
}

export const useStore = defineStore(
  'user',
  () => {
    const user = reactive<IUserStore>({ userInfo: {}, wxInfo: {} })

    const clearUser = () => {
      user.userInfo = {}
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

export interface IUserStore {
  userInfo: {
    name?: string
    phone?: string
    code?: string
    [x: string]: any
  }
  keepAliveId: number
  wxInfo?: {
    openid: string
    nickname: string
    portrait: string
  }
  [x: string]: any
}

export const useStore = defineStore('user', () => {
  const localName = import.meta.env.VITE_APP_LOCALSTORAGE_NAME
  const localStrong = localName
    ? useLocalStorage(import.meta.env.VITE_APP_LOCALSTORAGE_NAME, { userInfo: {}, keepAliveId: 1 })
    : undefined

  const user = reactive<IUserStore>(localStrong?.value ?? { userInfo: {}, keepAliveId: 1 })

  const clearUser = () => {
    Object.keys(user).forEach((key) => {
      delete user[key]
    })
  }

  return { user, clearUser }
})

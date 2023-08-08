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
  const localStrong = useLocalStorage(import.meta.env.VITE_LOCALSTORAGE_NAME, { userInfo: {}, keepAliveId: 1 })

  const user = reactive<IUserStore>(localStrong.value)

  const clearUser = () => {
    Object.keys(user).forEach((key) => {
      delete user[key]
    })
  }

  return { user, clearUser }
})

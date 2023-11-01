export const useStore = defineStore(
  'user',
  () => {
    const user = reactive<IUserStore>({ userInfo: {}, wxInfo: {}, keepAliveId: 1 })

    const clearUser = () => {
      Object.keys(user).forEach((key) => {
        delete user[key]
      })
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

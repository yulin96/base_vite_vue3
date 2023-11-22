export const useScanStore = defineStore(
  'scan',
  () => {
    const user = reactive<IUserStore>({ userInfo: {}, wxInfo: {} })

    const clearUser = () => {
      Object.keys(user).forEach((key) => {
        delete user[key]
      })
    }

    return { user, clearUser }
  },
  {
    persist: {
      key: (import.meta.env.VITE_APP_LOCALSTORAGE_NAME ?? 'test') + '_scan',
      paths: undefined,
      beforeRestore: () => {},
      debug: true,
    },
  },
)

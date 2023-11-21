interface IUserStore {
  userInfo: {
    name?: string
    phone?: string
    code?: string
    [x: string]: any
  }
  wxInfo: {
    openid?: string
    nickname?: string
    portrait?: string
  }
  [x: string]: any
}

interface IRes {
  code: number
  [x: string]: any
}

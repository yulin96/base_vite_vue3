interface IRes {
  code: number
  [x: string]: any
}

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
  keepAliveId: number
  [x: string]: any
}

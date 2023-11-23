interface IUserStore {
  userInfo: {
    name?: string
    phone?: string
    code?: string
    errId?: string
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
  msg?: string
  message?: string
  [x: string]: any
}

type RouteTransitionName =
  | 'Slide'
  | 'FilterBlur'
  | 'Zoom'
  | 'FlipY'
  | 'CollapseY'
  | 'DiagonallyFadeOut'
  | 'leftFlyOut'
  | 'slidePage'
  | (string & {})

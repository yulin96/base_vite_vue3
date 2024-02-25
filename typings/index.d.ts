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
  | 'slide-cover'
  | (string & {})

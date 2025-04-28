type ResData<T> = IRes & { data: T & { [x: string]: any } }

interface IRes {
  code: number
  msg?: string
  message?: string
  [x: string]: any
}

type FStamp = (type: 'password' | 'stamp', content: string) => any

type RouteTransitionName =
  | 'fade'
  | 'blur'
  | 'zoom'
  | 'slide'
  | 'flip-y'
  | 'collapse-y'
  | 'diagonally-fade-out'
  | 'left-fly-out'
  | 'slide-page'
  | 'slide-cover'
  | (string & {})

type IFormDataOrJSON = 'FormData' | 'JSON'

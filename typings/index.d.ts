type ResData<T> = IRes & { data: T & { [x: string]: any } }

interface IRes {
  code: number
  msg?: string
  message?: string
  [x: string]: any
}

type FStamp = (type: 'password' | 'stamp', content: string) => any

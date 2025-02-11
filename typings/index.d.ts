type DeepPartial<T> = T extends object ? { [K in keyof T]?: DeepPartial<T[K]> } : T

type ResData<T> = IRes & DeepPartial<{ data: T & { [x: string]: any } }>

interface IRes {
  code: number
  msg?: string
  message?: string
  [x: string]: any
}

type FStamp = (type: 'password' | 'stamp', content: string) => any

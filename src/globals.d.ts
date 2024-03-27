type ResData<T> = IRes & { data: T }

interface IRes {
  code: number
  msg?: string
  message?: string
  [x: string]: any
}

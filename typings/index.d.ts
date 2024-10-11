type ResData<T> = IRes & { data: (T & { [x: string]: any }) | null }

interface IRes {
  code: number
  msg?: string
  message?: string
  [x: string]: any
}

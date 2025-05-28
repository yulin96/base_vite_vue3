type ResData<T extends object = {}> = {
  code: number
  msg?: string
  message?: string
  data: T
} & Record<PropertyKey, any>

type FStamp = (type: 'password' | 'stamp', content: string) => any

type IFormDataOrJSON = 'FormData' | 'JSON'

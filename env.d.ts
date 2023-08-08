/// <reference types="vite/client" />

declare module 'weixin-js-sdk'
declare module 'console' {
  export = typeof import('console')
}

declare const html2canvas: typeof import('html2canvas').default
declare const lottie: typeof import('lottie-web').default

declare const WeixinJSBridge: any
declare const VConsole: any

interface ILinkTo {
  (path?: string, query?: { [name: string]: any }, params?: { [name: string]: any }): void
}

interface ImportMetaEnv {
  readonly VITE_VCONSOLE_ID: number
  readonly VITE_OSS_URL: string
  readonly VITE_API_URL: string
  readonly VITE_WS_API_URL: string
  readonly VITE_LOCALSTORAGE_NAME: string
}

import zhCN from './zh-CN.json'
import en from './en.json'
import { createI18n } from 'vue-i18n'

export type MessageSchema = typeof zhCN

declare module 'vue-i18n' {
  export interface DefineLocaleMessage extends MessageSchema {}
}

const { VITE_APP_LOCALSTORAGE_NAME: localName } = import.meta.env
const localeName = useLocalStorage(`${localName || 'test'}-local`, 'zh-CN')

const i18n = createI18n<[MessageSchema], 'zh-CN' | 'en'>({
  inheritLocale: true,
  legacy: false,
  locale: localeName.value,
  messages: {
    'zh-CN': zhCN,
    'en': en,
  },
})

export default i18n

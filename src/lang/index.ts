import zhCN from './zh-CN.json'
import en from './en.json'
import { createI18n } from 'vue-i18n'

export type MessageSchema = typeof zhCN

const { VITE_APP_LOCALSTORAGE_NAME: localName } = import.meta.env
const localeName = useLocalStorage((localName || 'test') + '-local', 'zh-CN')

const i18n = createI18n<false>({
  inheritLocale: true,
  legacy: false,
  locale: localeName.value,
  messages: {
    'en': en,
    'zh-CN': zhCN,
  },
})

export default i18n

import { createI18n } from 'vue-i18n'
import zh_CN from './zh_CN'
import en from './en'

const i18n = createI18n({
  locale: 'zh_CN', // 使用需修改默认
  globalInjection: true,
  legacy: false,
  fallbackLocale: 'zh_CN',
  messages: {
    en: en,
    zh_CN: zh_CN,
  },
})

export default i18n

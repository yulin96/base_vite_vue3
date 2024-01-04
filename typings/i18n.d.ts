import type { MessageSchema } from '~/lang'
import { DefineLocaleMessage } from 'vue-i18n'

declare module 'vue-i18n' {
  export interface DefineLocaleMessage extends MessageSchema {}
}

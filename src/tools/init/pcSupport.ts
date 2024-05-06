import { pcSupport } from '~/tools/pcSupport'

if (import.meta.env.VITE_APP_OPENPC == '1') {
  pcSupport().then(() => {})
}

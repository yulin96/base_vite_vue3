import { pcSupport } from '~/tools/init/pcSupport'

if (import.meta.env.VITE_APP_OPENPC == '1') {
  pcSupport().then(() => {})
}

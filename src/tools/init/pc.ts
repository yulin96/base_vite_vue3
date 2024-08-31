import { redirectIfPc } from '~/tools/redirectIfPc'

if (import.meta.env.VITE_APP_OPENPC == '1') {
  redirectIfPc().then(() => {})
}

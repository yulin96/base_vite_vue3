import { setNotifyDefaultOptions, showNotify } from 'vant'
import 'vant/es/notify/style'

setNotifyDefaultOptions({ type: 'warning', teleport: '#app' })

export const showMyNotify = showNotify

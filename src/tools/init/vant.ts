import '@vant/touch-emulator'
import { setDialogDefaultOptions, setNotifyDefaultOptions, setToastDefaultOptions } from 'vant'

setToastDefaultOptions({
  forbidClick: true,
  overlay: true,
  duration: 1200,
  overlayClass: 'center_toast_overlay',
  transition: 'center_fromTop_toast',
  position: 'middle',
  className: 'center_toast',
  teleport: '#app',
})
setToastDefaultOptions('loading', { duration: 0, loadingType: 'spinner' })
setNotifyDefaultOptions({ type: 'warning', teleport: '#app' })
setDialogDefaultOptions({ title: '温馨提示', theme: 'round-button', allowHtml: true, teleport: '#app' })

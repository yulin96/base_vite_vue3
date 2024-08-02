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
})
setToastDefaultOptions('loading', { duration: 0, loadingType: 'spinner' })
setNotifyDefaultOptions({ type: 'warning' })
setDialogDefaultOptions({ title: '温馨提示', theme: 'round-button', allowHtml: true })

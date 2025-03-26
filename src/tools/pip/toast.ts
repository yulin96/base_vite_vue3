import type { ToastOptions } from 'vant'
import { setToastDefaultOptions, showToast as toast } from 'vant'
import 'vant/es/toast/style'
import { useLoading } from '~/hooks/useLoading'

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

const { start } = useLoading([
  'https://oss.eventnet.cn/H5/zz/public/svg/success.svg',
  'https://oss.eventnet.cn/H5/zz/public/svg/info.svg',
  'https://oss.eventnet.cn/H5/zz/public/svg/fail.svg',
])

start()

export function showMyToast(
  option: (ToastOptions & { status?: 'success' | 'info' | 'fail' }) | string,
) {
  if (typeof option === 'string') return toast(option)

  const _message = option?.status
    ? `<img style="height: 20px;margin-right:6px;" src="https://oss.eventnet.cn/H5/zz/public/svg/${option.status}.svg" /><p>${option?.message || ''}</p>`
    : option?.message || ''

  return toast({ ...option, message: _message, type: 'html' })
}

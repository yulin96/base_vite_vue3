import type { ToastOptions } from 'vant'
import { showToast as toast } from 'vant'

const { start } = useLoading([
  'https://oss.eventnet.cn/H5/zz/public/svg/success.svg',
  'https://oss.eventnet.cn/H5/zz/public/svg/info.svg',
  'https://oss.eventnet.cn/H5/zz/public/svg/fail.svg',
])

start()

export function showStatusToast(option: (ToastOptions & { status?: 'success' | 'info' | 'fail' }) | string) {
  if (typeof option === 'string') return toast(option)

  const _message = option?.status
    ? `<img style="height: 20px;margin-right:6px;" src="https://oss.eventnet.cn/H5/zz/public/svg/${option.status}.svg" /><p>${option?.message || ''}</p>`
    : option?.message || ''

  return toast({ ...option, message: _message, type: 'html' })
}

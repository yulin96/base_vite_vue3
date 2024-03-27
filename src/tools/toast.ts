import { type ToastOptions, showToast as toast } from 'vant'

export const showToast = (option: (ToastOptions & { status?: 'success' | 'info' | 'fail' }) | string) => {
  if (typeof option === 'string') return toast(option)

  const _message = option?.status
    ? `<img style="height: 20px;margin-right:6px;" src="https://oss.eventnet.cn/H5/zz/public/svg/${option.status}.svg" /><p>${option?.message || ''}</p>`
    : option?.message || ''

  toast({ ...option, message: _message, type: 'html' })
}

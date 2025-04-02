import { devModel, reload } from '@/utils/global'
import { debounce } from 'es-toolkit'

if (devModel) {
  const _theWindow = window

  let prevWidth = _theWindow.innerWidth
  _theWindow.addEventListener(
    'resize',
    debounce(() => {
      const currentWidth = _theWindow.innerWidth
      if (currentWidth !== prevWidth) {
        reload()
      }
      prevWidth = currentWidth
    }, 600),
  )
}

import { debounce } from 'lodash-es'
import { devModel, reload } from '~/utils/global'

if (devModel) {
  const _theWindow = parent || window

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

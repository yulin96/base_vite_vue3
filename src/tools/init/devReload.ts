import { debounce } from 'lodash-es'
import { devModel, reload } from '~/utils/global'

if (devModel) {
  ;(parent || window).addEventListener(
    'resize',
    debounce(() => {
      reload()
    }, 600),
  )
}

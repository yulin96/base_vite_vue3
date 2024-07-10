import { debounce } from 'lodash-es'
import { devModel, reload } from '~/utils/global'

//FIXME: 安卓设备存在频繁刷新
if (devModel) {
  ;(parent || window).addEventListener(
    'resize',
    debounce(() => {
      reload()
    }, 600),
  )
}

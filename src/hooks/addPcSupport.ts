import { isMobile } from '~/utils/check'
import { useUrlSearchParams } from '@vueuse/core'

const params = useUrlSearchParams()
const { device = '' } = params
if (!isMobile() && !~device.indexOf('PC')) {
  window.location.href = './pc.html'
}

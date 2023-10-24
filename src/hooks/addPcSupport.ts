import { isMobile } from '~/utils/check'
import { useUrlSearchParams } from '@vueuse/core'

const params = useUrlSearchParams()
const { device = '', ...data } = params

let urlParams = ''
for (const key in data) urlParams += (urlParams ? '&' : '?') + `${key}=${data[key]}`

if (!isMobile() && !~device.indexOf('PC')) {
  window.location.href = './pc.html' + urlParams
}

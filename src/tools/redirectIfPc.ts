import { toUrl } from '~/utils/global'
import { isMobile } from '~/utils/uaParser'

export function redirectIfPc() {
  return new Promise<void>((resolve, _) => {
    const paramsSearch = new URLSearchParams(window.location.search)
    const params: { [x: string]: string}  = {}

    for (const key of paramsSearch.keys()) {
      params[key] = paramsSearch.get(key) ?? ''
    }

    const { device = '', ...data } = params

    let urlParams = ''
    for (const key in data) urlParams += (urlParams ? '&' : '?') + `${key}=${data[key]}`

    if (!isMobile && !~device.indexOf('PC')) {
      toUrl('./pc.html' + urlParams)
    } else {
      resolve()
    }
  })
}

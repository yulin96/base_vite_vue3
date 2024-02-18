import { UAParser } from 'ua-parser-js'

const uaParser = new UAParser()

export const isWeChat = uaParser.getBrowser().name === 'WeChat'

export const isIOS = uaParser.getOS().name === 'iOS'

export const isAndroid = uaParser.getOS().name === 'Android'

export const isMac = uaParser.getOS().name === 'Mac OS'

export const isWindows = uaParser.getOS().name === 'Windows'

export const isLinux = uaParser.getOS().name === 'Linux'

export const isChrome = uaParser.getBrowser().name === 'Chrome'

export const isFirefox = uaParser.getBrowser().name === 'Firefox'

export const isMobileSafari = uaParser.getBrowser().name === 'Mobile Safari'

export const isEdge = uaParser.getBrowser().name === 'Edge'

export const isIE = uaParser.getBrowser().name === 'IE'

export const isMobile = uaParser.getDevice().type === 'mobile'

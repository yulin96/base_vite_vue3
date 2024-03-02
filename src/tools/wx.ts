import wx from 'weixin-js-sdk'
import axios from 'axios'
import { isWeChat } from '~/utils/uaParser'

const wxConfigReady = Symbol('wxConfigReady')
window[wxConfigReady] = false

export const getWxConfig = () => {
  if (window[wxConfigReady]) return Promise.resolve()

  return new Promise<void>((resolve, reject) => {
    const urlType = ~theWindow.location.href.indexOf('h5.eventnet.cn') ? 'h5' : 'www'
    const wxLink = theWindow.location.href.split('#')[0]
    const data = new FormData()
    data.append('url', wxLink)
    axios
      .post(`https://${urlType}.eventnet.cn/wxAjax/fx/index.php`, data)
      .then((el) => {
        wx.config({
          appId: el.data.appId,
          timestamp: el.data.timestamp,
          nonceStr: el.data.nonceStr,
          signature: el.data.signature,
          jsApiList: [
            'scanQRCode',
            'updateAppMessageShareData',
            'updateTimelineShareData',
            'openLocation',
            'previewImage',
            'hideAllNonBaseMenuItem',
            'closeWindow',
          ],
          openTagList: ['wx-open-launch-app', 'wx-open-launch-weapp'],
        })
        wx.ready(function () {
          resolve()
          window[wxConfigReady] = true
        })
        wx.error(function (res) {
          reject(res.errMsg)
        })
      })
      .catch(function (error) {
        reject(error)
      })
  })
}

export type IWxShare = Pick<wx.IupdateAppMessageShareData, 'title' | 'desc' | 'link' | 'imgUrl'>

export const wxShare = (data: IWxShare): void => {
  const { title, desc, link, imgUrl } = data
  getWxConfig()
    .then(() => {
      wx.updateAppMessageShareData({ title, desc, link, imgUrl, success() {} })
      wx.updateTimelineShareData({ title, link, imgUrl, success() {} })
    })
    .catch((err) => {
      console.log(err)
    })
}

let scanLock = false
export const WxScanQRCode = (): Promise<string> => {
  if (scanLock) return Promise.reject('扫码中')
  scanLock = true
  return new Promise((resolve, reject) => {
    getWxConfig()
      .then(() => {
        wx.scanQRCode({
          needResult: 1,
          scanType: ['qrCode', 'barCode'],
          success: (res) => {
            resolve(res.resultStr)
          },
          complete: () => {
            scanLock = false
          },
        })
      })
      .catch((err) => {
        scanLock = false
        reject(err)
      })
  })
}

type IWxOpenLocation = Pick<wx.IopenLocation, 'latitude' | 'longitude' | 'name' | 'address'> &
  Partial<Pick<wx.IopenLocation, 'scale' | 'infoUrl'>>

/**
{
  latitude: 0,
  longitude: 0,
  name: '',
  address: '',
}
 */
let openLocationLock = false
export const wxOpenLocation = (data: IWxOpenLocation): void => {
  if (openLocationLock) return
  openLocationLock = true
  const { latitude, longitude, name, address, scale = 10, infoUrl = '' } = data
  getWxConfig()
    .then(() => {
      wx.openLocation({
        latitude,
        longitude,
        name,
        address,
        scale,
        infoUrl,
        complete: () => {
          openLocationLock = false
        },
      })
    })
    .catch((err) => {
      console.log(err)
      openLocationLock = false
    })
}

export const wxPreviewImage = (current: string, urls: string[]): void => {
  getWxConfig()
    .then(() => {
      wx.previewImage({ current, urls })
    })
    .catch((err) => {
      console.log(err)
    })
}

export const wxHideAllNonBaseMenuItem = () => {
  getWxConfig().then(() => {
    wx.hideAllNonBaseMenuItem()
  })
}

export const wxPreventShare = () => {
  const onBridgeReady = () => {
    WeixinJSBridge.call('hideOptionMenu')
  }

  if (typeof WeixinJSBridge == 'undefined') {
    if (document.addEventListener) {
      document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
      // @ts-ignore
    } else if (document.attachEvent) {
      // @ts-ignore
      document.attachEvent('WeixinJSBridgeReady', onBridgeReady)
      // @ts-ignore
      document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
    }
  } else {
    onBridgeReady()
  }
}

export const closeWindow = () => {
  isWeChat
    ? getWxConfig().then(() => {
        wx.closeWindow()
      })
    : window.close()
}

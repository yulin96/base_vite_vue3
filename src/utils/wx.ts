import wx from 'weixin-js-sdk'
import axios from 'axios'

const wxConfigReady = Symbol('wxConfigReady')
window[wxConfigReady] = false

const _getWXconfig = () => {
  return new Promise<void>((resolve, reject) => {
    if (window[wxConfigReady]) return resolve()
    const urlType = ~location.href.indexOf('h5.eventnet.cn') ? 2 : 1
    const wxLink = window.location.href.split('#')[0]
    const data = new FormData()
    data.append('url', wxLink)
    axios
      .post(`https://${urlType == 1 ? 'www' : urlType == 2 ? 'h5' : 'www'}.eventnet.cn/wxAjax/fx/index.php`, data)
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
        })
        wx.ready(function () {
          resolve()
          window[wxConfigReady] = true
        })
        wx.error(function (res: any) {
          reject(res.errMsg)
        })
      })
      .catch(function (error) {
        reject(error)
      })
  })
}

export interface IWxShare {
  title: string
  desc: string
  link: string
  imgUrl: string
}

export const WxShare = (data: IWxShare): void => {
  const { title, desc, link, imgUrl } = data
  _getWXconfig()
    .then(() => {
      wx.updateAppMessageShareData({ title, desc, link, imgUrl, success() {} })
      wx.updateTimelineShareData({ title, link, imgUrl, success() {} })
    })
    .catch((err) => {
      console.log(err)
    })
}

export const WxScanQRCode = (): Promise<{ resultStr: string; [x: string]: string }> => {
  return new Promise((resolve, reject) => {
    _getWXconfig()
      .then(() => {
        wx.scanQRCode({
          needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
          success: function (res: any) {
            resolve(res)
          },
        })
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export interface IWxOpenLocation {
  latitude: number
  longitude: number
  name: string
  address: string
  scale?: number
  infoUrl?: string
}

/**
{
  latitude: 0,
  longitude: 0,
  name: '',
  address: '',
}
 */
export const WxOpenLocation = (data: IWxOpenLocation): void => {
  const { latitude, longitude, name, address, scale = 10, infoUrl = '' } = data
  _getWXconfig()
    .then(() => {
      wx.openLocation({ latitude, longitude, name, address, scale, infoUrl })
    })
    .catch((err) => {
      console.log(err)
    })
}

export const WxPreviewImage = (current: string, urls: string[]): void => {
  _getWXconfig()
    .then(() => {
      wx.previewImage({ current, urls })
    })
    .catch((err) => {
      console.log(err)
    })
}

export const wxHideAllNonBaseMenuItem = () => {
  _getWXconfig().then(() => {
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
  isWeiXin()
    ? _getWXconfig().then(() => {
        wx.closeWindow()
      })
    : window.close()
}

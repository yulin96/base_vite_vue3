import wx from 'weixin-js-sdk'
import axios from 'axios'
import { isWeiXin } from './check'

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

type IWxShare = Pick<wx.IupdateAppMessageShareData, 'title' | 'desc' | 'link' | 'imgUrl'>

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

export const WxScanQRCode = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    _getWXconfig()
      .then(() => {
        wx.scanQRCode({
          needResult: 1,
          scanType: ['qrCode', 'barCode'],
          success: function (res: Record<'resultStr', string>) {
            resolve(res.resultStr)
          },
        })
      })
      .catch((err) => {
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

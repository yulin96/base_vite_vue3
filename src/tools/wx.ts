import axios, { toFormData } from 'axios'
import wx from 'weixin-js-sdk'
import { isWeChat } from '~/utils/uaParser'

const wxConfigReady = Symbol('wxConfigReady')
window[wxConfigReady] = false

export function getWechatConfig() {
  if (window[wxConfigReady]) return Promise.resolve()

  return new Promise<void>((resolve, reject) => {
    const wxLink = (parent || window).location.href.split('#')[0]
    axios
      .post(
        `https://wechat.event1.cn/api/getJsSdk`,
        toFormData({
          url: wxLink,
          name: 'hudongweipingtai',
        })
      )
      .then(({ data: { data } }) => {
        wx.config({
          appId: data.appId,
          timestamp: data.timestamp,
          nonceStr: data.nonceStr,
          signature: data.signature,
          jsApiList: [
            'scanQRCode',
            'updateAppMessageShareData',
            'updateTimelineShareData',
            'openLocation',
            'previewImage',
            'hideAllNonBaseMenuItem',
            'closeWindow',
            'hideMenuItems',
            'hideOptionMenu',
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

export function wechatShare(data: IWxShare) {
  return new Promise<boolean>((resolve, reject) => {
    const { title, desc, link, imgUrl } = data
    getWechatConfig()
      .then(() => {
        wx.updateAppMessageShareData({
          title,
          desc,
          link: `${link}${~link.indexOf('?') ? '&' : '?'}t=${+new Date()}`,
          imgUrl,
          success() {
            resolve(true)
          },
          fail() {
            resolve(false)
          },
        })
        wx.updateTimelineShareData({
          title,
          link: `${link}${~link.indexOf('?') ? '&' : '?'}t=${+new Date()}`,
          imgUrl,
          success() {
            resolve(true)
          },
          fail() {
            resolve(false)
          },
        })
      })
      .catch((err) => {
        resolve(false)
        console.log(err)
      })
  })
}

export function wechatScan(): Promise<string | void> {
  return new Promise((resolve, reject) => {
    getWechatConfig()
      .then(() => {
        wx.scanQRCode({
          needResult: 1,
          scanType: ['qrCode', 'barCode'],
          success: (res) => {
            resolve(res.resultStr)
          },
          complete: () => {
            resolve()
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

let openLocationLock = false
/**
 * @example
 * wxOpenLocation({
 *  latitude: 0,
 *  longitude: 0,
 *  name: '',
 *  address: '',
 * })
 */
export function wechatOpenLocation(data: IWxOpenLocation): void {
  if (openLocationLock) return
  openLocationLock = true
  const { latitude, longitude, name, address, scale = 10, infoUrl = '' } = data
  getWechatConfig()
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

export function wechatPreviewImage(current: string, urls: string[]): void {
  getWechatConfig()
    .then(() => {
      wx.previewImage({ current, urls })
    })
    .catch((err) => {
      console.log(err)
    })
}

export function wechatHideAllNonBaseMenuItem() {
  getWechatConfig().then(() => {
    wx.hideAllNonBaseMenuItem()
  })
}

export function wechatPreventShare() {
  const onBridgeReady = () => {
    WeixinJSBridge.call('hideOptionMenu')
  }

  if (typeof WeixinJSBridge == 'undefined') {
    if (document.addEventListener) {
      document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
      // @ts-expect-error 兼容性问题
    } else if (document.attachEvent) {
      // @ts-expect-error 兼容性问题
      document.attachEvent('WeixinJSBridgeReady', onBridgeReady)
      // @ts-expect-error 兼容性问题
      document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
    }
  } else {
    onBridgeReady()
  }
}

export function closeWindow() {
  isWeChat
    ? getWechatConfig().then(() => {
      wx.closeWindow()
    })
    : window.close()
}

export function wechatDisableTimeline() {
  if (isWeChat) {
    wx.hideMenuItems({
      menuList: ['menuItem:share:QZone', 'menuItem:share:timeline'],
    })
  } else {
    console.error('disableTimeline: not in wechat')
  }
}

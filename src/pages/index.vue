<script setup lang="ts">
import axios from 'axios'
import CryptoJS from 'crypto-js'
import gsap from 'gsap'
import { onMounted } from 'vue'

const test = () => {
  const t = Math.floor(Date.now())
  const in_format = 'json'
  const in_appName = 'lcap-ybm'
  const in_appSecret = 'F98C962A50C1CAEBD605FFBE0D270841'
  const in_source = 'lcap-ybm'
  const in_version = '1.0.0'
  const in_bot = 'lcap-ybm'
  const in_title = '标题'
  const in_content = '内容'
  const in_cardid = 'AAqj6VyQoXwCF'
  const in_url = 'https://aloha-qa.cn.walmartmobile.cn/aloha-notice-service/notice/send'
  const content = {
    user_ids: ['C0C04NC'],
    msg_type: 'interactive',
    card: {
      type: 'template',
      data: {
        template_id: in_cardid,
        template_variable: {
          content: in_title,
          title: in_title,
        },
      },
    },
  }

  const _params = {
    type: 'feishumsg',
    appName: in_bot,
    businessSubject: '数创飞书通知',
    contentBody: {
      content: JSON.stringify(content),
    },
    addressList: ['必须存在，无需赋值'],
  }

  const sign = middleSign(in_appName, in_appSecret, in_format, in_version, in_source, _params, t)
  if (!sign) return
  const params = jsonSort(_params)

  const requestBody = getRequestBody(
    in_appName,
    params,
    in_format,
    sign.sign,
    in_appName,
    t.toString(),
    in_version,
  )
  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
  }

  // 发送POST请求，上传文件
  axios
    .post(in_url, JSON.parse(requestBody), {
      headers,
      proxy: {
        host: 'http://proxy-m.cn.wal-mart.com',
        port: 8080,
      },
    })
    .then((response) => {
      console.log(response.data)
    })
    .catch((error) => {
      console.error(error)
    })
}

// 字符串排序
function jsonSort(params: any) {
  if (params.length === 0) return {}
  if (Array.isArray(params)) {
    let arr: any[] = []
    for (const res of params) {
      if (typeof res !== 'object') {
        arr = params.sort()
        break
      } else {
        const sorted_dict = {}
        let sorted_json_str = ''
        params = getParams(res)
        params = JSON.parse(params)
        Object.keys(params)
          .sort()
          .forEach((key) => {
            sorted_dict[key] = params[key]
          })
        sorted_json_str = JSON.stringify(sorted_dict).replace(/: /g, ':').replace(/, /g, ',')
        arr.push(JSON.parse(sorted_json_str))
      }
    }
    return JSON.stringify(arr).replace(/: /g, ':').replace(/, /g, ',')
  } else {
    const sorted_dict = {}
    let sorted_json_str = ''
    params = getParams(params)
    params = JSON.parse(params)
    Object.keys(params)
      .sort()
      .forEach((key) => {
        sorted_dict[key] = params[key]
      })
    sorted_json_str = JSON.stringify(sorted_dict).replace(/: /g, ':')
    return sorted_json_str.replace(/: /g, ':').replace(/, /g, ',')
  }
}

// 去除空字符
function getParams(params) {
  if (params.length === 0) return {}
  return JSON.stringify(params, Object.keys(params).sort())
    .replace(/: /g, ':')
    .replace(/, /g, ',')
    .trim()
}

// 中台签名算法
function middleSign(appName, appSecret, format, version, source, params, syncTime) {
  if (!appName || !appSecret || !format || !version || !source || !params) return ''
  const t = syncTime
  params = jsonSort(params)
  const signStr = appSecret + appName + source + t + format + version + params + appSecret
  const sign = CryptoJS.SHA512(signStr).toString(CryptoJS.enc.Hex).toUpperCase()
  return { sign, signStr }
}

// 生成请求体
function getRequestBody(appName, params, format, sign, source, timestamp, version) {
  const requestBody = {
    appName,
    format,
    param: JSON.parse(JSON.stringify(params).replace(/: /g, ':').replace(/, /g, ',')),
    sign,
    source,
    timestamp,
    version,
  }
  return JSON.stringify(requestBody).replace(/: /g, ':').replace(/, /g, ',')
}
/*  */
onMounted(() => {
  gsap.context(() => {
    gsap.timeline({ onComplete: () => {} }).delay(0.5)
  }, '.index')
})
</script>

<template>
  <section class="index">
    <main class="content flex flex-col items-center pt-200">
      <div @click="test">测试</div>
    </main>
  </section>
</template>

<route lang="json">
{ "meta": { "index": 10 } }
</route>

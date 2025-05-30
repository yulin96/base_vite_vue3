const baiduStatistics = import.meta.env.VITE_APP_HM_BAIDU

if (baiduStatistics) {
  const hm = document.createElement('script')
  hm.src = `https://hm.baidu.com/hm.js?${baiduStatistics}`
  const s = document.getElementsByTagName('script')[0]
  s.parentNode?.insertBefore(hm, s)
}

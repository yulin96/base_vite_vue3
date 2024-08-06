type WebpFeature = 'lossy' | 'lossless' | 'alpha' | 'animation'

/**
 * 检查浏览器是否支持 WebP
 * @param callback - 回调函数
 * @param feature - WebP 特性
 */
export function checkWebpFeature(
  callback: (feature: WebpFeature, result: boolean) => void,
  feature: WebpFeature = 'lossless',
) {
  const kTestImages = {
    lossy: 'UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA',
    lossless: 'UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==',
    alpha:
      'UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==',
    animation:
      'UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA',
  }
  const img = new Image()
  img.onload = function () {
    const result = img.width > 0 && img.height > 0
    callback(feature, result)
  }
  img.onerror = function () {
    callback(feature, false)
  }
  img.src = 'data:image/webp;base64,' + kTestImages[feature]
}

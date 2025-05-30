export type RGBColor = [number, number, number]

// 缓存颜色转换结果
const hexToRgbCache = new Map<string, RGBColor>()
const rgbToHexCache = new Map<string, string>()

/**
 * 将十六进制颜色值转换为 RGB 颜色值
 * @param hex - 十六进制颜色值，可以包含 # 前缀
 * @returns RGB 颜色值，以数组形式返回
 */
export function hexToRgb(hex: string): RGBColor {
  // 标准化颜色值
  const normalizedHex = hex.toLowerCase().replace(/^#/, '')

  // 检查缓存
  if (hexToRgbCache.has(normalizedHex)) {
    return [...hexToRgbCache.get(normalizedHex)!] // 返回缓存值的副本
  }

  // 如果是3位色值，转换为6位
  const fullHex =
    normalizedHex.length === 3
      ? normalizedHex
          .split('')
          .map((char) => `${char}${char}`)
          .join('')
      : normalizedHex

  // 转换为RGB
  const bigint = parseInt(fullHex, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255

  const rgb: RGBColor = [r, g, b]

  // 缓存结果
  hexToRgbCache.set(normalizedHex, rgb)

  return [...rgb] // 返回副本避免缓存被修改
}

/**
 * 将RGB颜色值转换为对应的十六进制表示
 * @param rgb - 包含颜色的红色、绿色和蓝色值的数组
 * @returns RGB颜色的十六进制表示
 */
export function rgbToHex(rgb: RGBColor): string {
  // 创建缓存键
  const cacheKey = rgb.join(',')

  // 检查缓存
  if (rgbToHexCache.has(cacheKey)) {
    return rgbToHexCache.get(cacheKey)!
  }

  // 转换每个通道为16进制
  const toHex = (n: number) => {
    const hex = Math.max(0, Math.min(255, Math.round(n))).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }

  const [r, g, b] = rgb
  const hexValue = `#${toHex(r)}${toHex(g)}${toHex(b)}`

  // 缓存结果
  rgbToHexCache.set(cacheKey, hexValue)

  return hexValue
}

/**
 * 计算颜色的亮度值
 * @param rgb - RGB颜色值数组，包含红、绿、蓝三个通道的值
 * @returns 颜色的亮度值 (0-255)
 */
export function getBrightness(rgb: RGBColor): number {
  const [r, g, b] = rgb
  // 使用加权平均来计算亮度，参考国际电信联盟建议的公式
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/**
 * 调整颜色的亮度
 * @param hex - 十六进制颜色值
 * @param percent - 调整的百分比，正值增加亮度，负值降低亮度
 * @returns 调整后的颜色值
 */
export function adjustBrightness(hex: string, percent: number): string {
  const rgb = hexToRgb(hex)

  // 调整单个颜色通道的值
  const adjust = (value: number, percent: number) => {
    const newValue = Math.round(value * (1 + percent / 100))
    return Math.min(255, Math.max(0, newValue))
  }

  return rgbToHex([adjust(rgb[0], percent), adjust(rgb[1], percent), adjust(rgb[2], percent)])
}

/**
 * 检查颜色是否为暗色
 * @param hex - 十六进制颜色值
 * @param threshold - 暗色阈值 (0-255)，默认为 128
 * @returns 如果颜色是暗色则返回 true，否则返回 false
 */
export function isDarkColor(hex: string, threshold = 128): boolean {
  const brightness = getBrightness(hexToRgb(hex))
  return brightness < threshold
}

/**
 * 计算颜色的互补色
 * @param hex - 十六进制颜色值
 * @returns 互补色的十六进制表示
 */
export function getComplementaryColor(hex: string): string {
  const [r, g, b] = hexToRgb(hex)
  return rgbToHex([255 - r, 255 - g, 255 - b])
}

/**
 * 在两个颜色之间平滑过渡
 * @param color1 - 第一个十六进制颜色值
 * @param color2 - 第二个十六进制颜色值
 * @param ratio - 过渡比例 (0-1)，0 表示纯色1，1 表示纯色2
 * @returns 过渡后的颜色值
 */
export function blendColors(color1: string, color2: string, ratio: number): string {
  const rgb1 = hexToRgb(color1)
  const rgb2 = hexToRgb(color2)

  // 确保比例在 0-1 范围内
  const r = Math.max(0, Math.min(1, ratio))

  // 计算两个颜色的加权平均
  const blendedRgb: RGBColor = [
    Math.round(rgb1[0] * (1 - r) + rgb2[0] * r),
    Math.round(rgb1[1] * (1 - r) + rgb2[1] * r),
    Math.round(rgb1[2] * (1 - r) + rgb2[2] * r),
  ]

  return rgbToHex(blendedRgb)
}

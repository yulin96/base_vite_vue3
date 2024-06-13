type RGBColor = [number, number, number]

/**
 * 将十六进制颜色值转换为 RGB 颜色值。
 * @param hex - 十六进制颜色值，可以包含 # 前缀。
 * @returns RGB 颜色值，以数组形式返回。
 */
export const hexToRgb = (hex: string): RGBColor => {
  hex = hex.replace(/^#/, '')

  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((char) => `${char}${char}`)
      .join('')
  }

  const bigint = parseInt(hex, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255

  return [r, g, b]
}

/**
 * 将RGB颜色值转换为对应的十六进制表示。
 * @param rgb - 包含颜色的红色、绿色和蓝色值的数组。
 * @returns RGB颜色的十六进制表示。
 */
export const rgbToHex = ([r, g, b]: RGBColor): string => {
  const toHex = (n: number) => {
    const hex = n.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

/**
 * 计算颜色的亮度值
 * @param rgbColor - RGB颜色值数组，包含红、绿、蓝三个通道的值
 * @returns 颜色的亮度值 (0-255)
 */
export const getBrightness = ([r, g, b]: RGBColor) => {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/**
 * 调整颜色的亮度
 * @param hex - 十六进制颜色值
 * @param percent - 调整的百分比
 * @returns 调整后的颜色值
 */
export const adjustBrightness = (hex: string, percent: number) => {
  const [r, g, b] = hexToRgb(hex)

  /**
   * 调整单个颜色通道的值
   * @param value - 颜色通道的原始值
   * @param percent - 调整的百分比
   * @returns 调整后的颜色通道值
   */
  const adjust = (value: number, percent: number) => {
    const newValue = Math.round(value * (1 + percent / 100))
    return Math.min(255, Math.max(0, newValue))
  }

  return rgbToHex([adjust(r, percent), adjust(g, percent), adjust(b, percent)])
}

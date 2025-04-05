import type { RouteNamedMap } from 'vue-router/auto-routes'

export type linkMapType = { [key in keyof RouteNamedMap]?: keyof RouteNamedMap }

/**
 * RGB 颜色值类型
 * 表示为包含三个元素的数组，分别对应红、绿、蓝三个颜色通道的值（0-255）
 */
export type RGBColor = [number, number, number]

/**
 * RGBA 颜色值类型
 * 表示为包含四个元素的数组，分别对应红、绿、蓝、透明度四个通道的值
 * RGB 通道范围为 0-255，透明度通道范围为 0-1
 */
export type RGBAColor = [number, number, number, number]

/**
 * 16进制颜色值类型
 * 格式为 #RRGGBB 或 #RGB
 */
export type HexColor = string

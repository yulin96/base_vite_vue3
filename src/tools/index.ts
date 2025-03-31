import type { RouteNamedMap } from 'vue-router/auto-routes'
import router from '~/router'

/**
 * 路由导航辅助函数
 * @param name 路由名称
 * @param config 路由配置选项
 * @param replace 是否使用replace模式导航(默认true)
 * @returns 导航Promise
 */
export function routerTo<T extends keyof RouteNamedMap>(
  name: T,
  config?: { params?: Record<string, any>; query?: Record<string, any> },
  replace: boolean = true,
) {
  try {
    const { params, query } = config ?? {}
    const navMethod = replace ? router.replace : router.push

    return navMethod({
      name,
      ...(params && { params }),
      ...(query && { query }),
    })
  } catch (error) {
    console.error('路由导航失败:', error)
    return Promise.reject(error)
  }
}

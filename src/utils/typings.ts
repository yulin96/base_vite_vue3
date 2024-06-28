import type { RouteNamedMap } from 'vue-router/auto-routes'

export type linkMapType = { [key in keyof RouteNamedMap]?: keyof RouteNamedMap }

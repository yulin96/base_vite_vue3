import router from '@/router'
import { type ClassValue, clsx } from 'clsx'
import { debounce } from 'es-toolkit'
import { twMerge } from 'tailwind-merge'
import type { RouteLocationRaw } from 'vue-router'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type ObjectValues<T> = T[keyof T]

export function debounceLeading<F extends (...args: any[]) => void>(fn: F, time = 600) {
  return debounce(fn, time, { edges: ['leading'] })
}

export function routerTo(to: RouteLocationRaw) {
  return router.replace(to)
}

import { type App, createApp } from 'vue'
import commonLoading from '~/components/common/loading.vue'

export const useMaskLoading = () => {
  let _loadingApp: App<Element> | null = null
  let _maskLoadingDome: HTMLDivElement | null = null

  const createLoading = () => {
    if (!_loadingApp) {
      _loadingApp = createApp(commonLoading)
      _maskLoadingDome = document.createElement('div')
      document.body.appendChild(_maskLoadingDome)
      _loadingApp.mount(_maskLoadingDome)
    }
  }

  const clearLoading = () => {
    if (_loadingApp) {
      _loadingApp.unmount()
      _loadingApp = null
    }
    if (_maskLoadingDome) {
      document.body.removeChild(_maskLoadingDome)
      _maskLoadingDome = null
    }
  }

  return { createLoading, clearLoading }
}

import { reload } from '~/utils/global'

/**
 * @description 检查更新
 */
document.body.addEventListener('plugin_web_update_notice', (e) => {
  const appVersion = `${import.meta.env.VITE_APP_LOCALSTORAGE_NAME || 'test'}-version`

  const { version } = e.detail
  const oldVersion = localStorage.getItem(appVersion)

  if (oldVersion === version) return
  localStorage.setItem(appVersion, version)
  reload()
})

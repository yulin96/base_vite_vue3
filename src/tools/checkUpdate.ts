/**
 * @description 检查更新
 */
document.body.addEventListener('plugin_web_update_notice', (e) => {
  const versionName = `${import.meta.env.VITE_APP_LOCALSTORAGE_NAME || 'test'}-version`

  const { version } = e.detail
  const oldVersion = localStorage.getItem(versionName)

  if (oldVersion === version) return
  localStorage.setItem(versionName, version)
  theWindow.location.reload()
})

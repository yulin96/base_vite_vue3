export const checkBuildVersion = () => {
  document.body.addEventListener('plugin_web_update_notice', (e) => {
    ;(parent || window).location.reload()
  })
}

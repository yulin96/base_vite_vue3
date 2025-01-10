const params = new URLSearchParams(window.location.search)

if (params.get('dev') !== null) {
  setTimeout(() => {
    const vConsoleScript = document.createElement('script')
    vConsoleScript.src = 'https://oss.eventnet.cn/H5/zz/public/vConsole.js'
    document.body.appendChild(vConsoleScript)
    //@ts-expect-error window.VConsole
    vConsoleScript.onload = () => new window.VConsole()
  }, 0)
}

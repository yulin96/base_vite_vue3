import { throttle } from 'lodash-es'

if (devModel) {
  let lastWidth = theWindow.innerWidth
  theWindow.addEventListener(
    'resize',
    throttle(() => {
      if (lastWidth !== theWindow.innerWidth) {
        theWindow.location.reload()
        lastWidth = theWindow.innerWidth
      }
    }, 300),
  )
}

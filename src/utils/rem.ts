import { isMobile } from './uaParser'
;(function flexible(window, document) {
  function setRemUnit() {
    const docEl = document.documentElement
    const width = isMobile ? docEl.clientWidth : 500
    const rem = (width / 750) * 100
    docEl.style.fontSize = rem + 'px'
  }

  setRemUnit()

  window.addEventListener('resize', setRemUnit)
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      setRemUnit()
    }
  })
})(window, document)

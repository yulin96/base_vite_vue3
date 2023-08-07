import topProgress from 'nprogress'

topProgress.configure({
  showSpinner: false,
  minimum: 0.3,
  trickleSpeed: 120,
})

export default topProgress

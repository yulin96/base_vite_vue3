export function useCountdown(data: number = 60) {
  const countdown = reactive({
    timer: data,
    timerId: undefined as NodeJS.Timeout | undefined,
    timerText: '获取验证码',
    sending: false,
  })

  const startTimer = (): void => {
    if (countdown.sending) return
    countdown.sending = true
    countdown.timerId = setInterval(() => {
      countdown.timer--
      countdown.timerText = `${countdown.timer}秒`
      if (countdown.timer <= 0) {
        clearInterval(countdown.timerId)
        countdown.sending = false
        countdown.timerText = '获取验证码'
        countdown.timer = data
      }
    }, 1000)
  }

  const stopTimer = () => {
    clearInterval(countdown.timerId)
    countdown.sending = false
    countdown.timerText = '获取验证码'
    countdown.timer = data
  }

  onUnmounted(() => {
    stopTimer()
  })

  onDeactivated(() => {
    stopTimer()
  })

  const { sending, timerText } = toRefs(countdown)
  return { sending, timerText, startTimer, stopTimer }
}

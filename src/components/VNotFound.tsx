import { defineComponent } from 'vue'

import './style/VNotFound.css'

export default defineComponent(() => {
  const router = useRouter()
  const linkTo = (path = '/', query = {}) => {
    router.replace({ path, query })
  }

  const getRandomInt = (n: number, m: number) => Math.floor(Math.random() * (m - n + 1) + n)
  const { user } = useStore()
  const id = user.userInfo.errId ?? getRandomInt(1, 10)

  user.userInfo.errId = id

  onMounted(() => {
    const errorele = document.getElementById('error') as HTMLElement

    errorele &&
      lottie?.loadAnimation({
        path: `https://oss.eventnet.cn/H5/zz/public/lotties/404/${id}.json`,
        container: errorele,
        loop: true,
        autoplay: true,
      })
  })

  return () => (
    <div class='wrapperErr'>
      <div class='error'>ERROR 404</div>
      <div id='error'></div>
      <div onClick={() => linkTo('/')} class='back'>
        回首页
      </div>
    </div>
  )
})

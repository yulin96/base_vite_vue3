import { type AnimationItem } from 'lottie-web'

interface Props {
  like: boolean
  [key: string]: any
}

fetch('https://oss.eventnet.cn/H5/zz/public/lotties/like/like1.json')
  .then((res) => res.json())
  .then((res) => {
    window['lottieJson-like'] = res
  })

export default defineComponent(
  (props: Props) => {
    const ele = ref()

    let lottieLike: AnimationItem
    onMounted(() => {
      lottieLike = lottie.loadAnimation({
        container: ele.value,
        loop: false,
        autoplay: false,
        renderer: 'canvas',
        ...(window['lottieJson-like']
          ? {
              animationData: window['lottieJson-like'],
            }
          : { path: 'https://oss.eventnet.cn/H5/zz/public/lotties/like/like1.json' }),
      })

      lottieLike.addEventListener('config_ready', () => {
        lottieLike.goToAndStop(props.like ? lottieLike.totalFrames - 1 : 0, true)
      })
    })

    watch(
      () => props.like,
      (newval) => {
        if (newval) {
          lottieLike?.goToAndPlay(0, true)
        } else {
          lottieLike?.goToAndStop(0, true)
        }
      },
    )

    onUnmounted(() => {
      lottieLike.destroy()
    })

    return () => (
      <div class={` h-[100px] w-100`}>
        <div class={`h-full w-full scale-[1.2]`} ref={ele}></div>
      </div>
    )
  },
  {
    props: ['like'],
  },
)

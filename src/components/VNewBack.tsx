import { defineComponent } from 'vue'
import './style/VNewBack.css'

interface Props {
  back_achieve: { [x: string]: any }
  [x: string]: any
}

export default defineComponent(
  (props: Props) => {
    const back_achieve = computed(() => props?.back_achieve ?? {})

    const backTool = reactive({
      show: false,
      url: '/',
      query: {},
    })

    const route = useRoute()

    watchEffect(async () => {
      if (!route.name) return
      const newName = (route.name as string).toLowerCase()
      if (back_achieve.value[newName]) {
        backTool.url = back_achieve.value[newName]?.[0] ?? back_achieve.value[newName]
        backTool.query = back_achieve.value[newName]?.[1] ?? {}
        if (backTool.show) return
        backTool.show = true
        await nextTick()
        gsap.fromTo(
          '.v-new-back',
          { opacity: 0, scale: 0.3 },
          { opacity: 1, scale: 1, duration: 0.39, delay: 0.2, ease: 'back.out' },
        )
      } else {
        backTool.url = '/'
        backTool.query = {}
        if (!backTool.show) return
        await gsap.to('.v-new-back', { opacity: 0, scale: 0.3, duration: 0.39, ease: 'back.in' })
        backTool.show = false
      }
    })

    const router = useRouter()
    const linkTo = (): void => {
      router.replace({ path: backTool.url, query: backTool.query })
    }

    const { user } = useStore()
    const offsetChange = (e: any) => {
      if (e.y < 80) e.y = 80
      user.backOffset = e
    }

    const backIcon = (
      <svg
        data-z-new-back
        class={`v-new-back icon `}
        viewBox='0 0 1024 1024'
        version='1.1'
        xmlns='http://www.w3.org/2000/svg'
        p-id='12321'>
        <path
          fill='#f78154'
          d='M512 42.496c258.048 0 469.504 211.456 469.504 469.504s-211.456 469.504-469.504 469.504S42.496 770.048 42.496 512C42.496 253.952 251.904 42.496 512 42.496zM213.504 512v8.704c0 2.048 0 2.048 2.048 4.096 0 2.048 0 2.048 2.048 4.096 0 2.048 2.048 2.048 2.048 4.096 0 0 0 2.048 2.048 2.048l6.656 6.144L398.848 711.68c4.096 8.704 16.896 12.8 27.648 12.8s21.504-4.096 29.696-12.8c16.896-16.896 16.896-42.496 0-59.904l-97.792-97.28h409.6c23.552 0 42.496-19.456 42.496-42.496s-19.456-42.496-42.496-42.496H358.4l98.304-98.304c16.896-16.896 16.896-42.496 0-59.904s-42.496-16.896-59.904 0L226.304 482.304l-6.656 6.144s-2.048 2.048-2.048 4.096-2.048 2.048-2.048 4.096 0 2.048-2.048 4.096v11.264z'
          p-id='12322'></path>
      </svg>
    )

    return () =>
      backTool.show && (
        <van-floating-bubble
          offset={{ x: user.backOffset?.x ?? -10, y: user.backOffset?.y ?? 100 }}
          onOffsetChange={offsetChange}
          axis='xy'
          magnetic='x'
          gap={6}
          onClick={linkTo}>
          {backIcon}
        </van-floating-bubble>
      )
  },
  {
    props: ['back_achieve'],
  },
)

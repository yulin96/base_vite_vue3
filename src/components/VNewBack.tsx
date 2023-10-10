import { FloatingBubble } from 'vant'
import 'vant/es/floating-bubble/style'
import './style/VNewBack.css'

interface Props {
  icon: string
  axis?: 'x' | 'y' | 'xy'
  magnetic?: 'x' | 'y'
  linkMap: object
  [key: string]: any
}

export default defineComponent(
  (props: Props) => {
    const { icon, axis, magnetic, linkMap } = props

    const { user } = useStore()
    const { offsetx, offsety } = user.userInfo

    const router = useRouter()

    const backIns = ref({
      show: false,
      name: '',
      offset: { x: offsetx ?? innerWidth - 80, y: offsety ?? innerHeight - 200 },
      onClick() {
        router.replace({ name: this.name || 'index' })
      },
    })

    const offsetChange = ({ x, y }: any) => {
      user.userInfo.offsetx = ~~x
      user.userInfo.offsety = ~~y
    }

    const route = useRoute()

    watch(
      () => route.name,
      (name) => {
        const backMap = linkMap
        if (name && backMap?.[name]) {
          backIns.value.name = backMap[name]
          backIns.value.show = true
        } else {
          backIns.value.show = false
        }
      },
      { immediate: true },
    )
    const linkTo = () => {
      const { name } = backIns.value
      router.replace({ name })
    }

    return () => (
      <>
        {backIns.value.show && (
          <FloatingBubble
            class={'w-100'}
            onOffsetChange={offsetChange}
            offset={backIns.value.offset}
            icon={icon ?? 'https://oss.eventnet.cn/H5/zz/celoma/back_t.png'}
            axis={axis ?? 'xy'}
            magnetic={magnetic ?? 'x'}
            gap={20}
            onClick={linkTo}></FloatingBubble>
        )}
      </>
    )
  },
  {
    props: ['icon', 'axis', 'magnetic', 'linkMap'],
  },
)

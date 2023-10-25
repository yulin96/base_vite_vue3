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

    const offsetx = computed(() => user.offsetx)
    const offsety = computed(() => user.offsety)

    const router = useRouter()

    const backIns = ref({
      show: false,
      name: '',
      offset: { x: 0, y: 0 },
      onClick() {
        router.replace({ name: this.name || 'index' })
      },
    })

    watch(
      [offsetx, offsety],
      () => {
        backIns.value.offset.x = offsetx.value ?? innerWidth - 60
        backIns.value.offset.y = offsety.value ?? innerHeight - 200
      },
      { immediate: true },
    )

    const offsetChange = ({ x, y }: any) => {
      user.offsetx = ~~x
      user.offsety = ~~y
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
    const linkTo = (e: MouseEvent) => {
      showLottie(e)
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
            icon={icon}
            axis={axis ?? 'xy'}
            magnetic={magnetic ?? 'x'}
            gap={10}
            onClick={(e) => linkTo(e)}></FloatingBubble>
        )}
      </>
    )
  },
  {
    props: ['icon', 'axis', 'magnetic', 'linkMap'],
  },
)

/*
  <!-- <v-new-back
    :icon="'https://oss.eventnet.cn/H5/zz/celoma/back_t.png'"
    :link-map="{ reg: 'home', line: 'home', index: 'index' }"></v-new-back> -->
*/

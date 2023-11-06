import { FloatingBubble } from 'vant'
import 'vant/es/floating-bubble/style'
import './style/VNewBack.css'

interface Props {
  icon: string
  axis?: 'x' | 'y' | 'xy'
  magnetic?: 'x' | 'y'
  linkMap: {
    [x: string]: string
  }
  [key: string]: any
}

export default defineComponent(
  (props: Props) => {
    const { icon, axis, magnetic, linkMap } = props

    const { user } = useStore()

    const offsetX = computed(() => user.offsetX)
    const offsetY = computed(() => user.offsetY)

    const router = useRouter()

    const backIns = ref({
      show: false,
      name: undefined as undefined | string,
      offset: { x: 0, y: 0 },
      onClick() {
        router.replace({ name: this.name || 'index' })
      },
    })

    watch(
      [offsetX, offsetY],
      () => {
        backIns.value.offset.x = offsetX.value ?? innerWidth - 60
        backIns.value.offset.y = offsetY.value ?? innerHeight - 200
      },
      { immediate: true },
    )

    const offsetChange = ({ x, y }: any) => {
      user.offsetX = ~~x
      user.offsetY = ~~y
    }

    const route = useRoute()

    watch(
      () => route.name,
      (newVal) => {
        const name = newVal as string
        if (name && linkMap?.[name]) {
          backIns.value.name = linkMap[name]
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
            icon={icon}
            axis={axis ?? 'xy'}
            magnetic={magnetic ?? 'x'}
            gap={10}
            onClick={() => linkTo()}></FloatingBubble>
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

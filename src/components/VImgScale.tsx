import Zoomist from 'zoomist'
import { defineComponent, defineProps, watch } from 'vue'

interface Props {
  url: string
  [key: string]: any
}

export default defineComponent(
  (props: Props) => {
    const uuid = 'zoomist_' + +new Date()

    watchPostEffect(() => {
      if (props.url) {
        const zoomEle = document.querySelector(`.zoomist.${uuid}`)
        if (zoomEle) new Zoomist(zoomEle, { height: false })
        else showDialog({ message: 'NOT_HAVE_DOM' })
      }
    })

    return () => <div class={`h-full w-full ${uuid} zoomist`} data-zoomist-src={props.url}></div>
  },
  {
    props: ['url'],
  },
)

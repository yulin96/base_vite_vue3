import { Teleport } from 'vue'
import { defineComponent, ref, onMounted, computed } from 'vue'
import './style/VAudio.css'

interface Props {
  [x: string]: any
  src: string
  play_icon?: string
  pause_icon?: string
}

export default defineComponent(
  (props: Props) => {
    const audio = ref<HTMLAudioElement | null>(null)
    const playImg = ref<HTMLImageElement | null>(null)
    const playing = ref(false)

    const play_icon = computed(() => props.play_icon || 'https://oss.eventnet.cn/H5/zz/public/svg/music/music_play.svg')
    const pause_icon = computed(
      () => props.play_icon || 'https://oss.eventnet.cn/H5/zz/public/svg/music/music_pause.svg',
    )

    const toggleMusic = () => {
      if (audio.value?.paused) {
        audio.value?.play()
      } else {
        audio.value?.pause()
      }
    }

    const control = (ele: any) => {
      if (ele.target != playImg.value && audio.value?.paused) {
        audio.value?.play()
      }
      document.body.removeEventListener('click', control)
    }

    onMounted(() => {
      document.addEventListener(
        'WeixinJSBridgeReady',
        () => {
          audio.value?.play()
          document.body.removeEventListener('click', control)
        },
        false,
      )

      document.body.addEventListener('click', control)
    })

    return () => (
      <Teleport to={'body'}>
        <div data-z-audio class={`${playing.value ? 'play' : ''} v-audio audio `}>
          <audio
            class={`hidden`}
            src={props.src}
            ref={audio}
            loop
            autoplay
            onPlay={() => {
              playing.value = true
            }}
            onPause={() => {
              playing.value = false
            }}></audio>
          <img
            style={`animation-play-state: ${playing.value ? 'running' : 'paused'}`}
            ref='playImg'
            src={playing.value ? play_icon.value : pause_icon.value}
            onClick={toggleMusic}
          />
        </div>
      </Teleport>
    )
  },
  {
    props: ['src', 'play_icon', 'pause_icon'],
  },
)

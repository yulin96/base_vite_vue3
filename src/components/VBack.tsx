import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import './style/VBack.css'

interface Props {
  url?: string
  query?: {}
  [key: string]: any
}

export default defineComponent(
  (props: Props) => {
    const router = useRouter()
    const linkTo = (): void => {
      router.replace({ path: props?.url ?? '/', query: props?.query ?? {} })
    }

    const backColor = '#f78154'

    return () => (
      <svg
        data-z-back
        onClick={linkTo}
        class={`v-back icon return`}
        viewBox='0 0 1024 1024'
        version='1.1'
        xmlns='http://www.w3.org/2000/svg'
        p-id='12321'>
        <path
          fill={backColor}
          d='M512 42.496c258.048 0 469.504 211.456 469.504 469.504s-211.456 469.504-469.504 469.504S42.496 770.048 42.496 512C42.496 253.952 251.904 42.496 512 42.496zM213.504 512v8.704c0 2.048 0 2.048 2.048 4.096 0 2.048 0 2.048 2.048 4.096 0 2.048 2.048 2.048 2.048 4.096 0 0 0 2.048 2.048 2.048l6.656 6.144L398.848 711.68c4.096 8.704 16.896 12.8 27.648 12.8s21.504-4.096 29.696-12.8c16.896-16.896 16.896-42.496 0-59.904l-97.792-97.28h409.6c23.552 0 42.496-19.456 42.496-42.496s-19.456-42.496-42.496-42.496H358.4l98.304-98.304c16.896-16.896 16.896-42.496 0-59.904s-42.496-16.896-59.904 0L226.304 482.304l-6.656 6.144s-2.048 2.048-2.048 4.096-2.048 2.048-2.048 4.096 0 2.048-2.048 4.096v11.264z'
          p-id='12322'></path>
      </svg>
    )
  },
  {
    props: ['url', 'query'],
  }
)

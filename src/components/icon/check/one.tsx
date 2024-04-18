import { type CSSProperties, defineModel } from 'vue'

interface IProps {
  style?: CSSProperties
  modelValue?: boolean
}

export default defineComponent(
  (props: IProps, { emit }) => {
    return () => (
      <svg
        onClick={() => emit('update:modelValue', !props.modelValue)}
        style={props.style}
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 17 17'
      >
        <g>
          <rect
            class='transition-all duration-200 ease-in-out'
            fill={props.modelValue ? '#3259ce' : '#ffffff'}
            stroke={props.modelValue ? '#3259ce' : '#c6c6c6'}
            stroke-miterlimit='10'
            stroke-width={1}
            x='.5'
            y='.5'
            width='16'
            height='16'
            rx='1.48'
            ry='1.48'
          />
          <path
            class={`origin-center transition-all duration-[.3s] ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${props.modelValue ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
            fill={`${props.modelValue ? '#ffffff' : 'transparent'}`}
            d='M3.8,6.7c-.24-.25-.59-.35-.92-.26-.33.08-.59.34-.68.67-.09.33,0,.68.25.92l3.88,3.93c.18.18.42.28.67.28s.5-.1.67-.28l6.53-6.63c.24-.24.34-.59.25-.92-.09-.33-.35-.59-.68-.67-.33-.08-.68.02-.92.26l-5.86,5.94-3.21-3.25Z'
          />
        </g>
      </svg>
    )
  },
  { props: ['style', 'modelValue'], emits: ['update:modelValue'] },
)

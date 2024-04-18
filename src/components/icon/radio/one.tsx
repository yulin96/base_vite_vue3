import { type CSSProperties } from 'vue'

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
        viewBox='0 0 18 18'
      >
        <g>
          <circle
            class='transition-all ease-in-out'
            fill='#ffffff00'
            stroke={props.modelValue ? '#3259ce' : '#c6c6c6'}
            stroke-miterlimit='10'
            stroke-width={1}
            cx='9'
            cy='9'
            r='8.5'
          />
          <circle
            class={`origin-center transition-all duration-[.3s] ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${props.modelValue ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
            fill='#3259ce'
            stroke-width='0'
            cx='9'
            cy='9'
            r='6'
          />
        </g>
      </svg>
    )
  },
  { props: ['style', 'modelValue'], emits: ['update:modelValue'] },
)

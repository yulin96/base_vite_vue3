import { type CSSProperties } from 'vue'

interface IProps {
  style?: CSSProperties
  color?: string
  fillColor?: string
}

export default defineComponent(
  (props: IProps) => {
    return () => (
      <svg style={props.style} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 35.96 36.01'>
        <g>
          <g class='cls-4'>
            <path
              class='cls-1'
              stroke-width='0'
              fill={props.color || 'currentColor'}
              d='M0,18C0,27.92,8.04,35.96,17.96,35.96s17.96-8.04,17.96-17.96S27.88.04,17.96.04,0,8.08,0,18H0Z'
            />
          </g>
          <path
            class='cls-3'
            stroke-width='0'
            fill={props.fillColor || '#fff'}
            d='M24.75,11.22h-12.7c-.56,0-1.02-.52-1.02-1.16v-.58c0-.64.45-1.16,1.02-1.16h12.7c.56,0,1.02.52,1.02,1.16v.58c0,.64-.45,1.16-1.02,1.16h0ZM11.64,18.85s5.56-5.07,5.61-5.14c.26-.29.61-.49,1-.54.05,0,.1,0,.15,0,.05,0,.1,0,.15,0,.39.05.74.24,1,.54.06.06,5.61,5.14,5.61,5.14.6.67.55,1.35-.05,2.01-.6.66-1.4.06-2-.6l-3.44-3.1v10.25c0,.64-.46,1.16-1.02,1.16h-.51c-.56,0-1.02-.52-1.02-1.16v-10.25l-3.44,3.1c-.6.67-1.4,1.27-2,.6-.6-.66-.65-1.35-.05-2.01h0Z'
          />
        </g>
      </svg>
    )
  },
  { props: ['style', 'color', 'fillColor'] },
)

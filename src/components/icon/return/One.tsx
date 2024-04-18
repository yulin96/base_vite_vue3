import { type CSSProperties } from 'vue'

interface IProps {
  style?: CSSProperties
  color?: string
  fillColor?: string
}

export default defineComponent(
  (props: IProps) => {
    return () => (
      <svg style={props.style} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 804 804'>
        <g>
          <circle fill={props.color || 'currentColor'} stroke-width='0px' class='cls-2' cx='402' cy='402' r='402' />
          <path
            stroke-width='0px'
            class='cls-1'
            fill={props.fillColor || '#ffffff'}
            d='m550.43,357.88c30.83,18.38,68.65,67.95,84.38,127.61,15.74,59.67,13.13,113.1,13.13,113.1,0,0-20.37-32.9-28.63-44.44-8.26-11.53-43.07-54.51-97.09-79.42-54.03-24.91-144.33-20.47-144.33-20.47v103.72l-248.88-176.29,248.88-176.29v104.67s59.79,4.5,91.04,10.97c52.64,10.9,81.51,36.83,81.51,36.83h0Z'
          />
        </g>
      </svg>
    )
  },
  { props: ['style', 'color', 'fillColor'] },
)

import React, { PropsWithChildren } from 'react'
import cn from 'classnames'

import styles from './styles.module.css'

type ComponentProps = {
  size?: number
  className?: string
  visible?: boolean
  color?: 'white' | 'black'
}

export function Loader(props: PropsWithChildren & ComponentProps) {
  if (props.visible === false) {
    return null
  }

  const cs = cn(styles.wrapper, props.className, {
    [styles.white]: props.color === 'white',
    [styles.black]: props.color === 'black',
  })

  const size = props.size || 42

  return (
    <div style={{ width: size, height: size }} className={cs}>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='xMidYMid'>
        <g>
          <circle
            stroke-dasharray='164.93361431346415 56.97787143782138'
            r='35'
            stroke-width='10'
            stroke=''
            fill='none'
            cy='50'
            cx='50'
          >
            <animateTransform
              keyTimes='0;1'
              values='0 50 50;360 50 50'
              dur='0.8333333333333334s'
              repeatCount='indefinite'
              type='rotate'
              attributeName='transform'
            ></animateTransform>
          </circle>
          <g></g>
        </g>
      </svg>
    </div>
  )
}

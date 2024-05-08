import React, { PropsWithChildren } from 'react'
import cn from 'classnames'

import styles from './styles.module.css'

type ComponentProps = {
  size: number
  className?: string
  visible?: boolean
  color?: 'white'
}

export function Loader(props: PropsWithChildren & ComponentProps) {
  if (props.visible === false) {
    return null
  }

  const cs = cn(styles.wrapper, props.className, {
    [styles.white]: props.color === 'white',
  })

  return (
    <div style={{ width: props.size, height: props.size }} className={cs}>
      <svg version='1.1' id='loader-1' xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' viewBox='0 0 50 50'>
        <path d='M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z'>
          <animateTransform
            attributeType='xml'
            attributeName='transform'
            type='rotate'
            from='0 25 25'
            to='360 25 25'
            dur='0.6s'
            repeatCount='indefinite'
          />
        </path>
      </svg>
    </div>
  )
}

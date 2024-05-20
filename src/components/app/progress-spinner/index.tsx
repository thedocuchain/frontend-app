import React, { PropsWithChildren } from 'react'

import { Text } from 'src/components/ui/typography'
import { Column } from 'src/components/ui/grid'
import { Space } from 'src/components/ui/space'

import styles from './styles.module.css'

type ComponentProps = {
  visible?: boolean
  title?: string
}

export function ProgressSpinner(props: PropsWithChildren & ComponentProps) {
  if (props.visible === false) {
    return null
  }

  return (
    <Column className='column-center'>
      <div className={styles.wrapper}>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='xMidYMid'>
          <g>
            <circle
              strokeDasharray='164.93361431346415 56.97787143782138'
              r='35'
              strokeWidth='10'
              stroke='#9fe870'
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
      {props.title && (
        <>
          <Space size={8} />
          <Text theme='body-3' className='nowrap'>
            {props.title}
          </Text>
        </>
      )}
    </Column>
  )
}

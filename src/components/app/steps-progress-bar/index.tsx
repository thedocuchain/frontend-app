import React, { useState } from 'react'
import cn from 'classnames'

import { Text } from 'src/components/ui/typography'
import { ProgressBar } from 'src/components/app/progress-bar'
import { IconArrowDown } from 'src/icons'

import styles from './style.module.css'

type ComponentProps = {
  steps: {
    title: string
    value: number
    isActive: boolean
  }[]
}

export function StepsProgressBar(props: ComponentProps) {
  const [isOpen, setOpen] = useState(false)

  return (
    <div className={cn(styles.container, { [styles.isOpen]: isOpen })} onClick={() => setOpen(!isOpen)}>
      {props.steps.map((el, index) => (
        <div key={`${el.title}${index}`} className={cn(styles.step, { [styles.active]: el.isActive })}>
          <ProgressBar isNoPercent value={el.value} />
          <Text theme='body-3' className={el.isActive ? 'color-text-accent' : 'color-text-secondary'}>
            {el.title}
          </Text>
        </div>
      ))}

      <IconArrowDown className={styles.arrow} />
    </div>
  )
}

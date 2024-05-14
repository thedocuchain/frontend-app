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
  }[]
  activeStep: string
}

export function StepsProgressBar(props: ComponentProps) {
  const [isOpen, setOpen] = useState(false)
  const isCompleted = props.activeStep === 'Completed'

  if (isCompleted) return null

  return (
    <div className={cn(styles.container, { [styles.isOpen]: isOpen })} onClick={() => setOpen(!isOpen)}>
      {props.steps.map((el, index) => (
        <div
          key={`${el.title}${index}`}
          className={cn(styles.step, { [styles.active]: el.title === props.activeStep })}
        >
          <ProgressBar isNoPercent value={el.value} />
          <Text theme='body-3' className={el.title === props.activeStep ? 'color-text-accent' : 'color-text-secondary'}>
            {el.title}
          </Text>
        </div>
      ))}

      <IconArrowDown className={styles.arrow} />
    </div>
  )
}

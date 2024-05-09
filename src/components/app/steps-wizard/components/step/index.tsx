import React from 'react'
import cn from 'classnames'

import { RowBetweenCenter, RowCenter } from 'src/components/ui/grid'
import { IconArrowRightLight, IconStepActive, IconStepCheck, IconStepNext } from 'src/icons'
import { Text } from 'src/components/ui/typography'

import styles from './style.module.css'

type ComponentProps = {
  step: {
    title: string
    isActive: boolean
  }
  index: number
  steps: {
    title: string
    isActive: boolean
  }[]
}

export function OneStepWizard(props: ComponentProps) {
  const { title, isActive } = props.step
  const isDone = props.index < props.steps.findIndex((el) => el.isActive)
  const isLast = props.index + 1 === props.steps.length

  return (
    <>
      <RowBetweenCenter className={styles.step}>
        <RowCenter className={styles.title}>
          {isActive && <IconStepActive />}
          {isDone && <IconStepCheck />}
          {!isDone && !isActive && <IconStepNext />}
          <Text theme='label-2' className={isActive ? 'color-text-accent' : null}>
            {title}
          </Text>
        </RowCenter>

        {!isLast && <IconArrowRightLight />}
      </RowBetweenCenter>

      <div className={cn(styles.stepMobile, { [styles.active]: isActive || isDone })} />
    </>
  )
}

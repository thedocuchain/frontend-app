import React from 'react'
import cn from 'classnames'

import { RowBetweenCenter, RowCenter } from 'src/components/ui/grid'
import { IconArrowRightLight, IconStepActive, IconStepCheck, IconStepNext } from 'src/icons'
import { Text } from 'src/components/ui/typography'
import { StepsDocumentPage, StepWizardType } from 'src/pages/doc/[id]/index.p'

import styles from './style.module.css'

type ComponentProps = {
  step: StepWizardType
  index: number
  steps: StepWizardType[]
  activeStep: StepsDocumentPage
}

export function OneStepWizard(props: ComponentProps) {
  const { step, activeStep } = props
  const isDone = props.index < props.steps.findIndex((el) => el.value === activeStep)
  const isLast = props.index + 1 === props.steps.length
  const isActive = step.value === activeStep
  return (
    <>
      <RowBetweenCenter className={styles.step}>
        <RowCenter className={styles.title}>
          {isActive && <IconStepActive />}
          {isDone && <IconStepCheck />}
          {!isDone && !isActive && <IconStepNext />}
          <Text theme='label-2' className={isActive ? 'color-text-accent' : null}>
            {step.title}
          </Text>
        </RowCenter>

        {!isLast && <IconArrowRightLight />}
      </RowBetweenCenter>

      <div className={cn(styles.stepMobile, { [styles.active]: isActive || isDone })} />
    </>
  )
}

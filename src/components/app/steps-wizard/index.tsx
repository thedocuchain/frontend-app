import React from 'react'

import { OneStepWizard } from 'src/components/app/steps-wizard/components/step'
import { RowCenter } from 'src/components/ui/grid'

import styles from './style.module.css'

type ComponentProps = {
  steps: {
    title: string
    isActive: boolean
  }[]
}

export function StepsWizard(props: ComponentProps) {
  return (
    <RowCenter className={styles.container}>
      {props.steps.map((el, index) => (
        <OneStepWizard key={`${el.title}${index}`} index={index} steps={props.steps} step={el} />
      ))}
    </RowCenter>
  )
}

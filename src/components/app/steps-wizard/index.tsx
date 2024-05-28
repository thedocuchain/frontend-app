import React from 'react'

import { OneStepWizard } from 'src/components/app/steps-wizard/components/step'
import { RowCenter } from 'src/components/ui/grid'
import { StepsDocumentPage, StepWizardType } from 'src/pages/doc/[id]/index'

import styles from './style.module.css'

type ComponentProps = {
  steps: StepWizardType[]
  activeStep: StepsDocumentPage
}

export function StepsWizard(props: ComponentProps) {
  return (
    <RowCenter className={styles.container}>
      {props.steps.map((el, index) => (
        <OneStepWizard
          key={`${el}${index}`}
          index={index}
          steps={props.steps}
          activeStep={props.activeStep}
          step={el}
        />
      ))}
    </RowCenter>
  )
}

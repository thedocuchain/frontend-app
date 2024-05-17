import React, { PropsWithChildren, useState } from 'react'

import {
  StepByStepBlock,
  StepByStepBlockType,
} from 'src/components/app/document-view-component/components/step-by-step-guide/components/step-by-step-block'

export function StepByStepGuideWrapper(
  props: PropsWithChildren & {
    steps: StepByStepBlockType[]
    isOpen: boolean
    setSuccessPage: () => void
  },
) {
  const steps = props.steps
  const [activeStep, setActiveStep] = useState(0)

  return (
    <>
      {props.children}

      {steps.map((step, index) => (
        <StepByStepBlock
          index={index}
          activeStep={activeStep}
          setSuccessPage={props.setSuccessPage}
          setActiveStep={setActiveStep}
          item={step}
          key={`${step.title}${index}`}
          stepsLength={steps.length}
          isOpen={props.isOpen}
        />
      ))}
    </>
  )
}

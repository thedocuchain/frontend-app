import React, { useState } from 'react'

import { PageDescription, PageHead, usePageHead } from 'src/components/common/page-head'
import { PageWrapper } from 'src/components/ui/ui-content'
import { Header } from 'src/components/app/header'
import { Flex } from 'src/components/ui/grid'
import { Recipient } from 'src/store/reducers/document/types'
import { StepAddRecipients } from 'src/pages/document/components/step-add-recipients'

import styles from './styles.module.css'

export default function DocumentPage(): JSX.Element {
  const { title } = usePageHead({ title: 'Document Page' })
  const [signers, setSigners] = useState<Recipient[]>([
    {
      name: '',
      email: '',
      role: 'signer',
    },
  ])

  const steps = ['Upload', 'Add recipients', 'Preview and send']
  const [activeStep, setActiveStep] = useState('Add recipients')

  return (
    <>
      <PageHead>{title}</PageHead>
      <PageDescription>Description</PageDescription>

      <PageWrapper>
        <Header isStepsWizard stepsWizard={steps} activeStepWizard={activeStep} />
        <Flex flex='1' className={styles.wrapper}>
          {activeStep === 'Add recipients' && (
            <StepAddRecipients
              signers={signers}
              setSigners={setSigners}
              steps={steps}
              activeStep={activeStep}
              setActiveStep={setActiveStep}
            />
          )}

          {activeStep === 'Preview and send' && <div></div>}
        </Flex>
      </PageWrapper>
    </>
  )
}

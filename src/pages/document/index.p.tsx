import React, { useState } from 'react'

import { PageDescription, PageHead, usePageHead } from 'src/components/common/page-head'
import { PageWrapper } from 'src/components/ui/ui-content'
import { Header } from 'src/components/app/header'
import { Flex } from 'src/components/ui/grid'
import { Recipient } from 'src/store/reducers/document/types'
import { StepAddRecipients } from 'src/pages/document/components/step-add-recipients'
import { Text } from 'src/components/ui/typography'
import { Space } from 'src/components/ui/space'
import { DocumentViewComponent } from 'src/components/app/document-view-component'

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
  const [activeStep, setActiveStep] = useState('Preview and send')
  // const [activeStep, setActiveStep] = useState('Add recipients')

  return (
    <>
      <PageHead>{title}</PageHead>
      <PageDescription>Description</PageDescription>

      <PageWrapper>
        <Header isStepsWizard stepsWizard={steps} activeStepWizard={activeStep} />
        <Flex flex='1' className={styles.wrapper}>
          <div className='show-tablet'>
            <Text theme={'label-2'} className='color-text-secondary'>
              Step {steps.findIndex((el) => el === activeStep) + 1} of {steps.length} - {activeStep}
            </Text>
            <Space size={24} />
          </div>

          {activeStep === 'Add recipients' && (
            <StepAddRecipients signers={signers} setSigners={setSigners} setActiveStep={setActiveStep} />
          )}

          {activeStep === 'Preview and send' && <DocumentViewComponent />}
        </Flex>
      </PageWrapper>
    </>
  )
}

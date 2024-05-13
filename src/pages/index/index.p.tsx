import React, { useState } from 'react'

import { PageDescription, PageHead, usePageHead } from 'src/components/common/page-head'
import { PageWrapper } from 'src/components/ui/ui-content'
import { Header } from 'src/components/app/header'
import { StepNewDocument } from 'src/pages/index/components/step-new-document'
import { Flex } from 'src/components/ui/grid'
import { StepCheckStatus } from 'src/pages/index/components/step-check-status'

import styles from './styles.module.css'

export default function IndexPage(): JSX.Element {
  const { title } = usePageHead({ title: 'Title' })
  const [step, setStep] = useState<'check-status' | 'new-document'>('new-document')

  return (
    <>
      <PageHead>{title}</PageHead>
      <PageDescription>Description</PageDescription>

      <PageWrapper>
        <Header setStep={setStep} step={step} />
        <Flex flex='1' className={styles.bg}>
          <div className={styles.wrapper}>
            {step === 'new-document' && <StepNewDocument />}
            {step === 'check-status' && <StepCheckStatus />}
          </div>
        </Flex>
      </PageWrapper>
    </>
  )
}

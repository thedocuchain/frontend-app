import React from 'react'

import { PageDescription, PageHead, usePageHead } from 'src/components/common/page-head'
import { PageWrapper } from 'src/components/ui/ui-content'
import { Header } from 'src/components/app/header'
import { documentMock } from 'src/pages/document-status-page/data'
import { DocumentViewComponent } from 'src/components/app/document-view-component'
import { Flex } from 'src/components/ui/grid'
import { StepByStepBlockType } from 'src/components/app/document-view-component/components/step-by-step-guide/components/step-by-step-block'

import styles from './styles.module.css'

export default function DocumentViewPage(): JSX.Element {
  const { title } = usePageHead({ title: 'View Page' })
  const document = documentMock
  const stepsHints: StepByStepBlockType[] = [
    {
      title: 'Please check the document before giving the required consents and sending.',
      buttonText: "I've read the document",
    },
    {
      title: 'Give the required consents before signing.',
      isCheckBoxConsents: true,
      buttonText: 'Next',
    },
    {
      title: 'Click the panel to add your signature, review it, and press ‘Finish’ to confirm signing.',
      isSignatureMobileBlock: true,
      buttonText: 'Finish',
    },
  ]

  return (
    <>
      <PageHead>{title}</PageHead>
      <PageDescription>Description</PageDescription>

      <PageWrapper className={'column'}>
        <Header isDocumentPreview title={document.name} />

        <Flex flex='1' className={styles.wrapper}>
          <DocumentViewComponent stepsHints={stepsHints} />
        </Flex>
      </PageWrapper>
    </>
  )
}

import React, { useState } from 'react'
import { useEvent } from '@coxy/utils/dist/use/use-event'
import Router, { useRouter } from 'next/router'

import { PageDescription, PageHead, usePageHead } from 'src/components/common/page-head'
import { PageWrapper } from 'src/components/ui/ui-content'
import { Header } from 'src/components/app/header'
import { DocumentViewComponent } from 'src/components/app/document-view-component'
import { Flex } from 'src/components/ui/grid'
import { StepByStepBlockType } from 'src/components/app/document-view-component/components/step-by-step-guide/components/step-by-step-block'
import { useAppSelector } from 'src/store/hooks'
import { selectedDocument } from 'src/store/reducers/document/selectors'
import { StatusScreenTemplate } from 'src/components/app/status-screen-template'
import { AppStore } from 'src/store'

import styles from './styles.module.css'

export type StepsSignPage = 'sign-the-document' | 'success-sign' | 'expired-link'

export function DocumentSignPage({ step }: { step: StepsSignPage }) {
  const document = useAppSelector(selectedDocument)
  const { title } = usePageHead({ title: document ? ` | ${document?.name}` : ' | Link expired' })
  const router = useRouter()
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

  const [activeStep, setActiveStep] = useState<StepsSignPage>(step)
  // const [activeStep, setActiveStep] = useState<StepsSignPage>('sign-the-document')
  // const [activeStep, setActiveStep] = useState<StepsSignPage>('expired-link')
  // const [activeStep, setActiveStep] = useState<StepsSignPage>('success-sign')

  const handleSetSuccessPage = useEvent(() => {
    setActiveStep('success-sign')
  })

  const handleSetDocumentView = useEvent(() => {
    void router.push(`/doc/${document.id}?view=true`)
  })

  return (
    <>
      <PageHead>{title}</PageHead>
      <PageDescription>Description</PageDescription>

      {activeStep === 'sign-the-document' && (
        <PageWrapper className={'column'}>
          <Header isDocumentPreview title={document.name} />

          <Flex flex='1' className={styles.wrapper}>
            <DocumentViewComponent setSuccessPage={handleSetSuccessPage} stepsHints={stepsHints} />
          </Flex>
        </PageWrapper>
      )}

      {activeStep === 'success-sign' && (
        <PageWrapper>
          <Header isTransparent />
          <StatusScreenTemplate isOneSigned setDocumentViewPage={handleSetDocumentView} />
        </PageWrapper>
      )}

      {activeStep === 'expired-link' && (
        <PageWrapper>
          <Header isTransparent />
          <StatusScreenTemplate isExpired />
        </PageWrapper>
      )}
    </>
  )
}

DocumentSignPage.getInitialProps = async (context, store: AppStore) => {
  const documentId = context.query.id as string
  // todo fix match
  const isMatchId = documentId.match(/[a-zA-Z0-9]{6}/)
  const state = store.getState()
  const document = selectedDocument(state)
  // todo переход на корень?
  if (!isMatchId) {
    if (context.res) {
      context.res.writeHead(302, { Location: '/' })
      context.res.end()
    } else {
      void Router.replace('/')
    }
  }

  if (!document) {
    return { step: 'expired-link' }
  }

  return { step: 'sign-the-document' }
}

import React, { useState } from 'react'
import { useEvent } from '@coxy/utils/dist/use/use-event'
import { useRouter } from 'next/router'
import { isAfter } from 'date-fns'

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
import { getDocument } from 'src/store/reducers/document/actions/get-document'
import { remindUser } from 'src/store/reducers/document/actions/remind'

import styles from './styles.module.css'

export type StepsSignPage = 'sign-the-document' | 'success-sign' | 'expired-link' | 'document-error'

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

      {activeStep === 'document-error' && (
        <PageWrapper>
          <Header isTransparent />
          <StatusScreenTemplate is404Document />
        </PageWrapper>
      )}

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
  const dispatch = store.dispatch
  const documentId = context.query.id as string
  const signerId = context.query.userId as string
  const expiredAt = context.query.expiredAt as string
  const today = new Date()
  const isExpired = isAfter(today, Number(expiredAt))

  const isMatchId = documentId.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/)
  if (!isMatchId) {
    return { step: 'document-error' }
  }

  const document = await dispatch(
    getDocument({
      id: documentId,
    }),
  ).unwrap()

  const isAlreadySigned = document?.users.find((user) => user.id === signerId)?.signatures[0].signed

  if (!document || !signerId || !expiredAt || isExpired) {
    if (isExpired && documentId && signerId) {
      await dispatch(
        remindUser({
          userId: signerId,
          documentId,
        }),
      )
    }

    return { step: 'expired-link' }
  }

  if (isAlreadySigned) {
    return { step: 'success-sign' }
  }

  return { step: 'sign-the-document' }
}

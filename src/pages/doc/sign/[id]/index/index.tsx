import React, { useState, useEffect } from 'react'
import { useEvent } from '@coxy/utils/dist/use/use-event'
import { isAfter } from 'date-fns'

import { PageHead, usePageHead } from 'src/components/common/page-head'
import { PageWrapper } from 'src/components/ui/ui-content'
import { Header } from 'src/components/app/header'
import { DocumentViewComponent } from 'src/components/app/document-view-component'
import { Flex } from 'src/components/ui/grid'
import { StepByStepBlockType } from 'src/components/app/document-view-component/components/step-by-step-guide/components/step-by-step-block'
import { useAppSelector, useAppDispatch } from 'src/store/hooks'
import { selectedDocument } from 'src/store/reducers/document/selectors'
import { StatusScreenTemplate } from 'src/components/app/status-screen-template'
import { AppStore } from 'src/store'
import { getDocument } from 'src/store/reducers/document/actions/get-document'
import { remindUser } from 'src/store/reducers/document/actions/remind'

import styles from './styles.module.css'

export type StepsSignPage =
  | 'sign-the-document'
  | 'success-sign'
  | 'success-all-signed'
  | 'expired-link'
  | 'document-error'

type DocumentSignPageProps = {
  step: StepsSignPage
  documentId?: string
  signerId?: string
}

export function DocumentSignPage({ step, documentId, signerId }: DocumentSignPageProps) {
  const document = useAppSelector(selectedDocument)
  const dispatch = useAppDispatch()
  const [activeStep, setActiveStep] = useState<StepsSignPage>(step)
  const { title } = usePageHead({ title: document ? ` | ${document?.name}` : ' | Link expired' })

  useEffect(() => {
    if (activeStep === 'expired-link' && documentId && signerId) {
      setTimeout(() => {
        dispatch(
          remindUser({
            userId: signerId,
            documentId,
          }),
        )
      }, 100)
    }
  }, [activeStep, documentId, signerId, dispatch])

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

  const isLastSigner =
    document?.users.filter((user) => user.role === 'signer' && !user.signatures[0].signed).length === 0

  const handleSetSuccessPage = useEvent(() => {
    if (isLastSigner) {
      setActiveStep('success-all-signed')
      return
    }
    setActiveStep('success-sign')
  })

  return (
    <>
      <PageHead>{title}</PageHead>

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
          <StatusScreenTemplate isOneSigned />
        </PageWrapper>
      )}

      {activeStep === 'success-all-signed' && (
        <PageWrapper>
          <Header isTransparent />
          <StatusScreenTemplate isAllSigned />
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
  const isExpired = isAfter(today, new Date(Number(expiredAt)))

  const isMatchId = documentId.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/)
  if (!isMatchId || !signerId || !expiredAt) {
    return { step: 'document-error' }
  }

  if (isExpired) {
    return {
      step: 'expired-link',
      documentId,
      signerId,
    }
  }

  const document = await dispatch(
    getDocument({
      id: documentId,
    }),
  ).unwrap()

  const isAlreadySigned = document?.users.find((user) => user.id === signerId)?.signatures[0].signed
  const isAllSigned = document?.users
    .filter((user) => user.role === 'signer')
    .every((user) => user.signatures[0].signed)

  if (!document) {
    return { step: 'document-error' }
  }

  if (isAllSigned) {
    return { step: 'success-all-signed' }
  }

  if (isAlreadySigned) {
    return { step: 'success-sign' }
  }

  return { step: 'sign-the-document' }
}

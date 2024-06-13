import React, { useState } from 'react'
import { useEvent } from '@coxy/utils/dist/use/use-event'

import { PageDescription, PageHead, usePageHead } from 'src/components/common/page-head'
import { PageWrapper } from 'src/components/ui/ui-content'
import { Header } from 'src/components/app/header'
import { Flex } from 'src/components/ui/grid'
import { DocumentStatuses, UserInfo } from 'src/store/reducers/document/types'
import { Text } from 'src/components/ui/typography'
import { Space } from 'src/components/ui/space'
import { StepAddRecipients } from 'src/pages/doc/[id]/components/step-add-recipients'
import { StepPreviewAndSend } from 'src/pages/doc/[id]/components/step-preview-and-send'
import { StepCheckStatus } from 'src/pages/doc/[id]/components/step-check-status'
import { StepViewDocument } from 'src/pages/doc/[id]/components/step-view-document'
import { useAppSelector } from 'src/store/hooks'
import { selectedDocument } from 'src/store/reducers/document/selectors'
import { StatusScreenTemplate } from 'src/components/app/status-screen-template'
import { AppStore } from 'src/store'
import { getDocument } from 'src/store/reducers/document/actions/get-document'

import styles from './styles.module.css'

export type StepsDocumentPage =
  | 'upload'
  | 'add-recipients'
  | 'preview-and-send'
  | 'success-send'
  | 'success-all-signed'
  | 'check-status'
  | 'document-view'
  | 'document-error'
export type StepWizardType = {
  title: string
  value: StepsDocumentPage
}

export function DocumentPage({ step }: { step: StepsDocumentPage }) {
  const document = useAppSelector(selectedDocument)
  const { title } = usePageHead({ title: ` | ${document?.name}` })
  const [signers, setSigners] = useState<UserInfo[]>([
    {
      name: '',
      email: '',
      role: 'signer',
    },
  ])
  const steps: StepWizardType[] = [
    { title: 'Upload', value: 'upload' },
    { title: 'Add recipients', value: 'add-recipients' },
    { title: 'Preview and send', value: 'preview-and-send' },
  ]
  const [activeStep, setActiveStep] = useState<StepsDocumentPage>(step)

  const activeStepTitle = steps.find((el) => el.value === activeStep)

  const handleSetCheckStatusPage = useEvent(() => {
    setActiveStep('check-status')
  })

  return (
    <>
      <PageHead>{title}</PageHead>
      <PageDescription>Description</PageDescription>
      <PageWrapper className={'column'}>
        {activeStep === 'success-send' && (
          <>
            <Header isTransparent />
            <StatusScreenTemplate setCheckStatusPage={handleSetCheckStatusPage} isSend />
          </>
        )}

        {activeStep === 'success-all-signed' && (
          <>
            <Header isTransparent />
            <StatusScreenTemplate setCheckStatusPage={handleSetCheckStatusPage} isAllSigned />
          </>
        )}

        {activeStep === 'document-error' && (
          <>
            <Header isTransparent />
            <StatusScreenTemplate is404Document />
          </>
        )}

        {activeStep === 'document-view' && <StepViewDocument />}

        {activeStep === 'check-status' && <StepCheckStatus />}

        {(activeStep === 'preview-and-send' || activeStep === 'add-recipients') && (
          <>
            <Header isStepsWizard stepsWizard={steps} activeStepWizard={activeStep} />
            <Flex flex='1' className={styles.wrapper}>
              <div className='show-tablet'>
                <Text theme={'label-2'} className='color-text-secondary'>
                  Step {steps.findIndex((el) => el.value === activeStep) + 1} of {steps.length} -{' '}
                  {activeStepTitle.title}
                </Text>
                <Space size={24} />
              </div>

              {activeStep === 'add-recipients' && (
                <StepAddRecipients signers={signers} setSigners={setSigners} setActiveStep={setActiveStep} />
              )}

              {activeStep === 'preview-and-send' && <StepPreviewAndSend setActiveStep={setActiveStep} />}
            </Flex>
          </>
        )}
      </PageWrapper>
    </>
  )
}

DocumentPage.getInitialProps = async (context, store: AppStore) => {
  const dispatch = store.dispatch
  const isDocumentViewPage = context.query.view as string
  const documentId = context.query.id as string

  const isMatchId = documentId.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/)
  if (!isMatchId) {
    return { step: 'document-error' }
  }

  const document = await dispatch(
    getDocument({
      id: documentId,
    }),
  ).unwrap()

  if (!document) {
    return { step: 'document-error' }
  }

  if (isDocumentViewPage) {
    return { step: 'document-view' }
  }

  if (document.status === DocumentStatuses.UPLOADED || document.status === DocumentStatuses.DRAFT) {
    return { step: 'add-recipients' }
  }

  if (document.status === DocumentStatuses.RECIPIENT_ADDED) {
    return { step: 'preview-and-send' }
  }

  if (document.status === DocumentStatuses.SENT) {
    return { step: 'success-send' }
  }

  if (
    document.status === DocumentStatuses.SIGNED ||
    document.status === DocumentStatuses.COMPLETED ||
    document.status === DocumentStatuses.BLOCKCHAINED
  ) {
    return { step: 'success-all-signed' }
  }

  if (document.status === DocumentStatuses.DELIVERED || document.status === DocumentStatuses.PARTIALLY_SIGNED) {
    return { step: 'check-status' }
  }
}

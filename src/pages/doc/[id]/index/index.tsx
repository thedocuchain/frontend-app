import React, { useState } from 'react'
import cn from 'classnames'

import { PageHead, usePageHead } from 'src/components/common/page-head'
import { PageWrapper } from 'src/components/ui/ui-content'
import { Header } from 'src/components/app/header'
import { Flex } from 'src/components/ui/grid'
import { DocumentStatuses, UserInfo } from 'src/store/reducers/document/types'
import { Text } from 'src/components/ui/typography'
import { Space } from 'src/components/ui/space'
import { StepAddRecipients } from 'src/pages/doc/[id]/components/step-add-recipients'
import { StepPreviewAndSend } from 'src/pages/doc/[id]/components/step-preview-and-send'
import { StepsWizard } from 'src/components/app/steps-wizard'
import { useAppSelector } from 'src/store/hooks'
import { selectedDocument } from 'src/store/reducers/document/selectors'
import { selectedAccountToken } from 'src/store/reducers/auth'
import { StatusScreenTemplate } from 'src/components/app/status-screen-template'
import { DocumentLayout } from 'src/components/app/document-layout'
import { AppStore } from 'src/store'
import { getDocument } from 'src/store/reducers/document/actions/get-document'
import { requireAccountAuthReturn } from 'src/utils/account-guard'

import styles from './styles.module.css'

export type StepsDocumentPage =
  | 'upload'
  | 'add-recipients'
  | 'preview-and-send'
  | 'success-send'
  | 'document-error'
export type StepWizardType = {
  title: string
  value: StepsDocumentPage
}

export function DocumentPage({ step }: { step: StepsDocumentPage }) {
  const document = useAppSelector(selectedDocument)
  const inDashboard = !!useAppSelector(selectedAccountToken)
  const { title } = usePageHead({ title: ` | ${document?.name || 'Document not found'}` })
  const [signers, setSigners] = useState<UserInfo[]>([
    {
      name: '',
      email: '',
      role: 'watcher',
    },
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

  const wizardActiveStep = activeStep
  const activeStepTitle = steps.find((el) => el.value === wizardActiveStep)

  return (
    <>
      <PageHead>{title}</PageHead>
      <PageWrapper className={'column'}>
        {activeStep === 'success-send' && (
          <>
            {!inDashboard && <Header isTransparent />}
            <StatusScreenTemplate isSend />
          </>
        )}

        {activeStep === 'document-error' && (
          <>
            {!inDashboard && <Header isTransparent />}
            <StatusScreenTemplate is404Document />
          </>
        )}

        {(activeStep === 'preview-and-send' || activeStep === 'add-recipients') && (
          <>
            {inDashboard ? (
              <div className={styles.dashboardWizard}>
                <StepsWizard steps={steps} activeStep={wizardActiveStep} />
              </div>
            ) : (
              <Header isStepsWizard stepsWizard={steps} activeStepWizard={wizardActiveStep} />
            )}
            <Flex flex='1' className={cn(styles.wrapper, { [styles.inDashboard]: inDashboard })}>
              <div className='show-tablet'>
                <Text theme={'label-2'} className='color-text-secondary'>
                  Step {steps.findIndex((el) => el.value === wizardActiveStep) + 1} of {steps.length} -{' '}
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
  const documentId = context.query.id as string

  const isMatchId = documentId.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/)
  if (!isMatchId) {
    return { step: 'document-error' }
  }

  // Creating/sending a document for signing requires an account. Unauthenticated
  // users are sent to sign up and returned to this page afterwards.
  if (!requireAccountAuthReturn(context, store, `/doc/${documentId}`)) {
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

  if (document.status === DocumentStatuses.UPLOADED || document.status === DocumentStatuses.DRAFT) {
    return { step: 'add-recipients' }
  }

  if (document.status === DocumentStatuses.RECIPIENT_ADDED) {
    return { step: 'preview-and-send' }
  }

  return { step: 'success-send' }
}

DocumentPage.getLayout = DocumentLayout

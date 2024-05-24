import React, { useEffect, useState } from 'react'
import { useEvent } from '@coxy/utils/dist/use/use-event'
import { useRouter } from 'next/router'

import { PageDescription, PageHead, usePageHead } from 'src/components/common/page-head'
import { PageWrapper } from 'src/components/ui/ui-content'
import { Header } from 'src/components/app/header'
import { Flex } from 'src/components/ui/grid'
import { User } from 'src/store/reducers/document/types'
import { Text } from 'src/components/ui/typography'
import { Space } from 'src/components/ui/space'
import { StepAddRecipients } from 'src/pages/doc/[id]/components/step-add-recipients'
import { StepPreviewAndSend } from 'src/pages/doc/[id]/components/step-preview-and-send'
import { StepCheckStatus } from 'src/pages/doc/[id]/components/step-check-status'
import { StepViewDocument } from 'src/pages/doc/[id]/components/step-view-document'
import { useAppSelector } from 'src/store/hooks'
import { selectedDocument } from 'src/store/reducers/document/selectors'
import { StatusScreenTemplate } from 'src/components/app/status-screen-template'

import styles from './styles.module.css'

export type StepsDocumentPage =
  | 'upload'
  | 'add-recipients'
  | 'preview-and-send'
  | 'success-send'
  | 'success-all-signed'
  | 'check-status'
  | 'document-view'
export type StepWizardType = {
  title: string
  value: StepsDocumentPage
}

export default function DocumentPage(): JSX.Element {
  const document = useAppSelector(selectedDocument)
  const { title } = usePageHead({ title: ` | ${document?.name}` })
  const [signers, setSigners] = useState<Partial<User>[]>([
    {
      name: '',
      email: '',
      role: { name: 'signer' },
    },
  ])
  const steps: StepWizardType[] = [
    { title: 'Upload', value: 'upload' },
    { title: 'Add recipients', value: 'add-recipients' },
    { title: 'Preview and send', value: 'preview-and-send' },
  ]
  const [activeStep, setActiveStep] = useState<StepsDocumentPage>('add-recipients')
  // const [activeStep, setActiveStep] = useState<StepsDocumentPage>('preview-and-send')
  // const [activeStep, setActiveStep] = useState<StepsDocumentPage>('success-send')
  // const [activeStep, setActiveStep] = useState<StepsDocumentPage>('success-all-signed')
  // const [activeStep, setActiveStep] = useState<StepsDocumentPage>('check-status')
  // const [activeStep, setActiveStep] = useState<StepsDocumentPage>('document-view')

  const activeStepTitle = steps.find((el) => el.value === activeStep)

  // todo match documentId and move logic to getInitialProps
  // const router = useRouter()
  // const documentId = router.query.id as string
  // const isMatchId = documentId.match(/[a-z]{3}-[a-z]{4}-[a-z]{3}/)
  // const [isLoadingPage, setIsLoadingPage] = useState(true)
  // useEffect(() => {
  //   if (!isMatchId) {
  //     void router.push('/')
  //   }
  //
  //   setIsLoadingPage(false)
  // }, [])
  //
  // if (isLoadingPage) return <OverlayBlur />
  // if (!isMatchId) return <OverlayBlur />

  const handleSetCheckStatusPage = useEvent(() => {
    setActiveStep('check-status')
  })

  const router = useRouter()
  const isDocumentViewPage = router.query.view as string

  useEffect(() => {
    if (isDocumentViewPage) {
      setActiveStep('document-view')
    }
  }, [])

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

import React, { useState } from 'react'
import { useEvent } from '@coxy/utils/dist/use/use-event'
import { useRouter } from 'next/router'

import { PageDescription, PageHead, usePageHead } from 'src/components/common/page-head'
import { PageWrapper } from 'src/components/ui/ui-content'
import { Header } from 'src/components/app/header'
import { DocumentViewComponent } from 'src/components/app/document-view-component'
import { Flex } from 'src/components/ui/grid'
import { StepByStepBlockType } from 'src/components/app/document-view-component/components/step-by-step-guide/components/step-by-step-block'
import { SuccessStatusComponent } from 'src/components/app/success-status-component'
import { useAppSelector } from 'src/store/hooks'
import { selectedDocument } from 'src/store/reducers/document/selectors'

import styles from './styles.module.css'

export type StepsSignPage = 'sign-the-document' | 'success-sign'

export default function DocumentViewPage(): JSX.Element {
  const document = useAppSelector(selectedDocument)
  const { title } = usePageHead({ title: ` | ${document?.title}` })
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

  const [activeStep, setActiveStep] = useState<StepsSignPage>('sign-the-document')
  // const [activeStep, setActiveStep] = useState<StepsSignPage>('success-sign')

  const handleSetSuccessPage = useEvent(() => {
    setActiveStep('success-sign')
  })

  const handleSetDocumentView = useEvent(() => {
    void router.push(`/doc/${document.id}?view=true`)
  })

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

  return (
    <>
      <PageHead>{title}</PageHead>
      <PageDescription>Description</PageDescription>

      {activeStep === 'sign-the-document' && (
        <PageWrapper className={'column'}>
          <Header isDocumentPreview title={document.title} />

          <Flex flex='1' className={styles.wrapper}>
            <DocumentViewComponent setSuccessPage={handleSetSuccessPage} stepsHints={stepsHints} />
          </Flex>
        </PageWrapper>
      )}

      {activeStep === 'success-sign' && (
        <PageWrapper>
          <Header isTransparent />
          <SuccessStatusComponent setDocumentViewPage={handleSetDocumentView} />
        </PageWrapper>
      )}
    </>
  )
}

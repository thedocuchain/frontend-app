import React from 'react'
import { useEvent } from '@coxy/utils/dist/use/use-event'

import { DocumentViewComponent } from 'src/components/app/document-view-component'
import { StepByStepBlockType } from 'src/components/app/document-view-component/components/step-by-step-guide/components/step-by-step-block'
import { StepsDocumentPage } from 'src/pages/doc/[id]/index'

export function StepPreviewAndSend(props: { setActiveStep: (step: StepsDocumentPage) => void }): JSX.Element {
  const stepsHints: StepByStepBlockType[] = [
    {
      title: 'Please check the document before giving the required consents and sending.',
      buttonText: "I've read the document",
    },
    {
      title: 'Give the required consents and send document.',
      isCheckBoxTermsAndPrivacy: true,
      buttonText: 'Send for signing',
    },
  ]

  const handleSetSuccessPage = useEvent(() => {
    props.setActiveStep('success-send')
  })

  return (
    <>
      <DocumentViewComponent setSuccessPage={handleSetSuccessPage} stepsHints={stepsHints} />
    </>
  )
}

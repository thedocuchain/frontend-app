import React, { useEffect } from 'react'

import { PageHead, usePageHead } from 'src/components/common/page-head'
import { PageWrapper } from 'src/components/ui/ui-content'
import { StepCheckStatus } from 'pages/doc/status/[id]/index/components/step-check-status'
import { useAppDispatch, useAppSelector } from 'src/store/hooks'
import { selectedDocument } from 'src/store/reducers/document/selectors'
import { AppStore } from 'src/store'
import { getDocument } from 'src/store/reducers/document/actions/get-document'
import { Header } from 'src/components/app/header'
import { StatusScreenTemplate } from 'src/components/app/status-screen-template'
import { isNeedToUpdateDocument } from 'src/utils/check-document-statuses'

export type StepsDocumentStatusPage = 'success-all-signed' | 'check-status' | 'document-error'

export function DocumentStatusPage({ step }: { step: StepsDocumentStatusPage }) {
  const document = useAppSelector(selectedDocument)
  const { title } = usePageHead({ title: ` | ${document?.name || 'Document not found'}` })
  const activeStep = step

  const dispatch = useAppDispatch()

  useEffect(() => {
    let interval

    if (document && isNeedToUpdateDocument(document.status)) {
      interval = setInterval(() => {
        dispatch(
          getDocument({
            id: document.id,
          }),
        )
      }, 3000)
    }

    return () => clearInterval(interval)
  }, [document?.status])

  return (
    <>
      <PageHead>{title}</PageHead>
      <PageWrapper className={'column'}>
        {activeStep === 'check-status' && <StepCheckStatus />}

        {activeStep === 'document-error' && (
          <>
            <Header isTransparent />
            <StatusScreenTemplate is404Document />
          </>
        )}

        {activeStep === 'success-all-signed' && (
          <>
            <Header isTransparent />
            <StatusScreenTemplate isAllSigned />
          </>
        )}
      </PageWrapper>
    </>
  )
}

DocumentStatusPage.getInitialProps = async (context, store: AppStore) => {
  const dispatch = store.dispatch
  const documentId = context.query.id as string
  const isAllSigned = context.query.success as string

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

  if (isAllSigned) {
    return { step: 'success-all-signed' }
  }

  return { step: 'check-status' }
}

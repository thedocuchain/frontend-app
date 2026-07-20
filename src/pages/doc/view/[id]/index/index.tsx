import React from 'react'

import { PageHead, usePageHead } from 'src/components/common/page-head'
import { PageWrapper } from 'src/components/ui/ui-content'
import { useAppSelector } from 'src/store/hooks'
import { selectedDocument } from 'src/store/reducers/document/selectors'
import { selectedAccountToken } from 'src/store/reducers/auth'
import { AppStore } from 'src/store'
import { getDocument } from 'src/store/reducers/document/actions/get-document'
import { Header } from 'src/components/app/header'
import { DocumentLayout } from 'src/components/app/document-layout'
import { StatusScreenTemplate } from 'src/components/app/status-screen-template'
import { StepViewDocument } from 'src/pages/doc/view/[id]/index/components/step-view-document'

export type StepsDocumentStatusPage = 'document-view' | 'document-error'

export function DocumentViewPage({ step }: { step: StepsDocumentStatusPage }) {
  const document = useAppSelector(selectedDocument)
  const inDashboard = !!useAppSelector(selectedAccountToken)
  const { title } = usePageHead({ title: ` | ${document?.name || 'Document not found'}` })
  const activeStep = step

  return (
    <>
      <PageHead>{title}</PageHead>
      <PageWrapper className={'column'}>
        {activeStep === 'document-error' && (
          <>
            {!inDashboard && <Header isTransparent />}
            <StatusScreenTemplate is404Document />
          </>
        )}

        {activeStep === 'document-view' && <StepViewDocument inDashboard={inDashboard} />}
      </PageWrapper>
    </>
  )
}

DocumentViewPage.getInitialProps = async (context, store: AppStore) => {
  const dispatch = store.dispatch
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

  return { step: 'document-view' }
}

DocumentViewPage.getLayout = DocumentLayout

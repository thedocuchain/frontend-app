import React from 'react'

import { PageDescription, PageHead, usePageHead } from 'src/components/common/page-head'
import { PageWrapper } from 'src/components/ui/ui-content'
import { Header } from 'src/components/app/header'
import { Footer } from 'pages/document-success/components/footer'
import { SuccessStatusComponent } from 'src/components/app/success-status-component'

export default function DocumentSuccessPage(): JSX.Element {
  const { title } = usePageHead({ title: 'Success Page' })

  return (
    <>
      <PageHead>{title}</PageHead>
      <PageDescription>Description</PageDescription>

      <PageWrapper>
        <Header />
        <SuccessStatusComponent isAllSigned />
        <Footer />
      </PageWrapper>
    </>
  )
}

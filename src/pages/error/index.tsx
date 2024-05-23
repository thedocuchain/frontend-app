import React from 'react'

import { PageWrapper } from 'src/components/ui/ui-content'
import { PageHead, usePageHead } from 'src/components/common/page-head'
import { StatusScreenTemplate } from 'src/components/app/status-screen-template'
import { Header } from 'src/components/app/header'

export default function PageServerError() {
  const { title } = usePageHead({ title: '| Server error' })

  return (
    <>
      <PageHead>{title}</PageHead>
      <PageWrapper>
        <Header isTransparent />
        <StatusScreenTemplate isServerErrorPage />
      </PageWrapper>
    </>
  )
}

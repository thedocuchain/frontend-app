// eslint-disable-next-line filename-rules/match
import React from 'react'

import { PageDescription, PageHead, usePageHead } from 'src/components/common/page-head'
import { PageWrapper } from 'src/components/ui/ui-content'
import { StatusScreenTemplate } from 'src/components/app/status-screen-template'
import { Header } from 'src/components/app/header'

export default function Page404() {
  const { title } = usePageHead({ title: '| Page not found' })

  return (
    <>
      <PageHead>{title}</PageHead>
      <PageDescription>Page not found</PageDescription>
      <PageWrapper>
        <Header isTransparent />
        <StatusScreenTemplate is404Page />
      </PageWrapper>
    </>
  )
}

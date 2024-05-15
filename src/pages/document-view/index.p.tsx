import React from 'react'

import { PageDescription, PageHead, usePageHead } from 'src/components/common/page-head'
import { PageWrapper } from 'src/components/ui/ui-content'
import { Header } from 'src/components/app/header'
import { documentMock } from 'src/pages/document-status-page/data'
import { DocumentViewComponent } from 'src/components/app/document-view-component'
import { Flex } from 'src/components/ui/grid'

import styles from './styles.module.css'

export default function DocumentViewPage(): JSX.Element {
  const { title } = usePageHead({ title: 'View Page' })
  const document = documentMock

  return (
    <>
      <PageHead>{title}</PageHead>
      <PageDescription>Description</PageDescription>

      <PageWrapper className={'column'}>
        <Header isDocumentPreview title={document.name} />

        <Flex flex='1' className={styles.wrapper}>
          <DocumentViewComponent />
        </Flex>
      </PageWrapper>
    </>
  )
}

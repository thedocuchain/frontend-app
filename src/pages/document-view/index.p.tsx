import React, { useState } from 'react'
import cn from 'classnames'

import { PageDescription, PageHead, usePageHead } from 'src/components/common/page-head'
import { PageWrapper } from 'src/components/ui/ui-content'
import { Header } from 'src/components/app/header'
import { Column, Container, Flex, RowBetween } from 'src/components/ui/grid'
import { documentMock } from 'src/pages/document-status-page/data'
import { Text } from 'src/components/ui/typography'
import { SidePanelPagesPreview } from 'pages/document-view/components/side-panel-pages-preview'

import styles from './styles.module.css'

export default function DocumentViewPage(): JSX.Element {
  const { title } = usePageHead({ title: 'View Page' })
  const document = documentMock
  const [isOpen, setOpen] = useState(false)

  return (
    <>
      <PageHead>{title}</PageHead>
      <PageDescription>Description</PageDescription>

      <PageWrapper className={'column'}>
        <Header isDocumentPreview title={document.name} />

        <Flex flex='1' className={styles.wrapper}>
          <SidePanelPagesPreview document={document} isOpen={isOpen} setOpen={setOpen} />

          <Container className={cn('column', { [styles.containerIfOpen]: isOpen })}>
            <Column className={styles.textColumn}>
              <RowBetween className={styles.textWrapper}>
                <Text theme={'headline-1'}>{document.name}</Text>
                <Text theme={'body-3'} className='color-text-secondary'>
                  Document ID: {document.id}
                </Text>
              </RowBetween>
              <Text theme={'body-3'} className='color-text-secondary'>
                {document.pages} pages
              </Text>
            </Column>

            <div className={styles.mockPage} />
            <div className={styles.mockPage} />
            <div className={styles.mockPage} />
          </Container>
        </Flex>
      </PageWrapper>
    </>
  )
}

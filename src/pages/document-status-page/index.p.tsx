import React from 'react'

import { PageDescription, PageHead, usePageHead } from 'src/components/common/page-head'
import { PageWrapper } from 'src/components/ui/ui-content'
import { Header } from 'src/components/app/header'
import { Flex } from 'src/components/ui/grid'

import styles from './styles.module.css'

export default function DocumentStatusPage(): JSX.Element {
  const { title } = usePageHead({ title: 'Document Status Page' })

  return (
    <>
      <PageHead>{title}</PageHead>
      <PageDescription>Description</PageDescription>

      <PageWrapper>
        <Header />
        <Flex flex='1' className={styles.wrapper}></Flex>
      </PageWrapper>
    </>
  )
}

import React from 'react'

import { PageDescription, PageHead, usePageHead } from 'src/components/common/page-head'
import { PageWrapper } from 'src/components/ui/ui-content'
import { Column, Flex } from 'src/components/ui/grid'
import { Header } from 'src/components/app/header'

export default function IndexPage(): JSX.Element {
  const { title } = usePageHead({ title: 'Title' })
  return (
    <>
      <PageHead>{title}</PageHead>
      <PageDescription>Description</PageDescription>

      <PageWrapper>
        <Flex flex='1'>
          <Header />
          <Column className='column-center h100-p'></Column>
        </Flex>
      </PageWrapper>
    </>
  )
}

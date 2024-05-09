import React from 'react'

import { PageDescription, PageHead } from 'src/components/common/page-head'
import { PageWrapper } from 'src/components/ui/ui-content'
import { Column, Flex } from 'src/components/ui/grid'

export default function IndexPage(): JSX.Element {
  return (
    <>
      <PageHead>Title</PageHead>
      <PageDescription>Description</PageDescription>

      <PageWrapper>
        <Flex flex='1'>
          <Column className='column-center h100-p'>{/* <UploadCardBg></UploadCardBg> */}</Column>
        </Flex>
      </PageWrapper>
    </>
  )
}

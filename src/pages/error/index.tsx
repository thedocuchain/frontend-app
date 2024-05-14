import React from 'react'

import { Button } from 'src/components/ui/button'
import { PageWrapper } from 'src/components/ui/ui-content'
import { PageHead, usePageHead } from 'src/components/common/page-head'
import { Container, Flex } from 'src/components/ui/grid'
import { Text } from 'src/components/ui/typography'
import { Space } from 'src/components/ui/space'

export default function PageServerError() {
  const { title } = usePageHead({ title: 'Server error' })

  return (
    <>
      <PageHead>{title}</PageHead>
      <PageWrapper>
        <Flex flex='1'>
          <Container className='column-center h100-p'>
            <Text theme='headline-1' header='h1'>
              Server Error
            </Text>
            <Space size={16} />
            <Text theme='body-1' className={'color-text-secondary text-center'}>
              But don&apos;t worry, try refreshing the page later
            </Text>
            <Space size={44} />

            <Button href='/'>Refresh</Button>
            <Space />
          </Container>
        </Flex>
      </PageWrapper>
    </>
  )
}

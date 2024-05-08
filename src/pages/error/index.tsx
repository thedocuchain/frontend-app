import React from 'react'

import { Button } from 'src/components/ui/button'
import { PageWrapper } from 'src/components/ui/ui-content'
import { PageHead, usePageHead } from 'src/components/common/page-head'
import { Column, Flex } from 'src/components/ui/grid'
import { Text } from 'src/components/ui/typography'
import { Space } from 'src/components/ui/space'

export default function PageServerError() {
  const { title } = usePageHead({ title: 'Server error' })

  return (
    <>
      <PageHead>{title}</PageHead>
      <PageWrapper>
        <Flex flex='1'>
          <Column className='column-center h100-p'>
            <Text theme='headline-1' header='h1'>
              Server Error
            </Text>
            <Text theme='headline-2' header='h3'>
              Looks like you get lost
            </Text>
            <Text theme='body-1' className={'color-text-secondary'}>
              But don&apos;t worry, try refreshing the page later
            </Text>

            <Button href='/'>Refresh</Button>
            <Space />
          </Column>
        </Flex>
      </PageWrapper>
    </>
  )
}

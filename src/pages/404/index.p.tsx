// eslint-disable-next-line filename-rules/match
import React from 'react'

import { Text } from 'src/components/ui/typography'
import { Button } from 'src/components/ui/button'
import { PageDescription, PageHead, usePageHead } from 'src/components/common/page-head'
import { PageWrapper } from 'src/components/ui/ui-content'
import { Column, Flex } from 'src/components/ui/grid'
import { Space } from 'src/components/ui/space'

export default function Page404() {
  const { title } = usePageHead({ title: '404' })

  return (
    <>
      <PageHead>{title}</PageHead>
      <PageDescription>Page not found</PageDescription>
      <PageWrapper>
        <Flex flex='1'>
          <Column className='column-center h100-p'>
            <Text theme='headline-1' header='h1'>
              <span className='color-brand-primary'>404. </span>The page was not found
            </Text>
            <Text theme='body-1' className={'color-text-secondary'}>
              It may have been moved, or you just entered the page address incorrectly. If you need help, please contact
              us by email{' '}
              <a className='underline-hover' href='mailto:support@docuchain.io'>
                support@docuchain.io
              </a>
            </Text>
            <Button href='/'>Go to the main page</Button>
            <Space />
          </Column>
        </Flex>
      </PageWrapper>
    </>
  )
}

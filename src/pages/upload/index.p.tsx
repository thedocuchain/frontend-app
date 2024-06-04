import React from 'react'

import { PageDescription, PageHead, usePageHead } from 'src/components/common/page-head'
import { PageWrapper } from 'src/components/ui/ui-content'
import { StepNewDocument } from 'src/pages/upload/components/step-new-document'

import styles from './styles.module.css'

export default function IndexPage(): JSX.Element {
  const { title } = usePageHead({ title: 'Title' })

  return (
    <>
      <PageHead>{title}</PageHead>
      <PageDescription>Description</PageDescription>

      <PageWrapper>
        <div className={styles.wrapper}>
          <StepNewDocument />
        </div>
      </PageWrapper>
    </>
  )
}

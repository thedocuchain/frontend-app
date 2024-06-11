import React, { useState } from 'react'
import cn from 'classnames'

import { Column, Container, RowBetween } from 'src/components/ui/grid'
import { Text } from 'src/components/ui/typography'
import { SidePanelPagesPreview } from 'src/components/app/document-view-component/components/side-panel-pages-preview'
import { StepByStepGuideWrapper } from 'src/components/app/document-view-component/components/step-by-step-guide'
import { StepByStepBlockType } from 'src/components/app/document-view-component/components/step-by-step-guide/components/step-by-step-block'
import { useAppSelector } from 'src/store/hooks'
import { selectedDocument } from 'src/store/reducers/document/selectors'
import { PdfViewPage } from 'src/components/app/pdf-view-page'

import styles from './styles.module.css'

export function DocumentViewComponent(props: {
  stepsHints?: StepByStepBlockType[]
  setSuccessPage?: () => void
  isViewPage?: boolean
}) {
  const document = useAppSelector(selectedDocument)
  const [isOpen, setOpen] = useState(false)
  const [isErrorLoadingPdf, setErrorLoadingPdf] = useState(false)
  const { stepsHints, setSuccessPage, isViewPage } = props

  return (
    <StepByStepGuideWrapper isViewPage={isViewPage} setSuccessPage={setSuccessPage} steps={stepsHints} isOpen={isOpen}>
      <SidePanelPagesPreview isOpen={isOpen} setOpen={setOpen} isErrorLoadingPdf={isErrorLoadingPdf} />

      <Container className={cn(styles.container, 'column', { [styles.containerIfOpen]: isOpen })}>
        <Column className={styles.textColumn}>
          <RowBetween className={styles.textWrapper}>
            <Text theme={'headline-1'}>{document.name}</Text>
            <Text theme={'body-3'} className='color-text-secondary white-space-nowrap'>
              Document ID: {document?.shortId}
            </Text>
          </RowBetween>
          <Text theme={'body-3'} className='color-text-secondary'>
            {document.pagesCount} pages
          </Text>
        </Column>

        <PdfViewPage setErrorLoadingPdf={setErrorLoadingPdf} />
      </Container>

      <div className={styles.space} />
    </StepByStepGuideWrapper>
  )
}

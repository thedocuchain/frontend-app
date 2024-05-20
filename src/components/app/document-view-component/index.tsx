import React, { useState } from 'react'
import cn from 'classnames'

import { Column, Container, RowBetween } from 'src/components/ui/grid'
import { Text } from 'src/components/ui/typography'
import { SidePanelPagesPreview } from 'src/components/app/document-view-component/components/side-panel-pages-preview'
import { Space } from 'src/components/ui/space'
import { StepByStepGuideWrapper } from 'src/components/app/document-view-component/components/step-by-step-guide'
import { StepByStepBlockType } from 'src/components/app/document-view-component/components/step-by-step-guide/components/step-by-step-block'
import { GuideLabel } from 'src/components/app/document-view-component/components/step-by-step-guide/components/guide-label'
import { useAppSelector } from 'src/store/hooks'
import { selectedDocument } from 'src/store/reducers/document/selectors'
import { PdfViewPage } from 'src/components/app/pdf-view-page'

import styles from './styles.module.css'

export function DocumentViewComponent(props: {
  stepsHints: StepByStepBlockType[]
  setSuccessPage: () => void
}): JSX.Element {
  const document = useAppSelector(selectedDocument)
  const [isOpen, setOpen] = useState(false)
  const { stepsHints } = props

  return (
    <StepByStepGuideWrapper setSuccessPage={props.setSuccessPage} steps={stepsHints} isOpen={isOpen}>
      <SidePanelPagesPreview isOpen={isOpen} setOpen={setOpen} />

      <Container className={cn(styles.container, 'column', { [styles.containerIfOpen]: isOpen })}>
        <Column className={styles.textColumn}>
          <RowBetween className={styles.textWrapper}>
            <Text theme={'headline-1'}>{document.title}</Text>
            <Text theme={'body-3'} className='color-text-secondary white-space-nowrap'>
              Document ID: {document.id}
            </Text>
          </RowBetween>
          <Text theme={'body-3'} className='color-text-secondary'>
            {document.pages} pages
          </Text>
        </Column>

        <GuideLabel positionY={document.xOffset + 100} title={'Sign'} />

        <PdfViewPage />
      </Container>

      <Space size={136} />
    </StepByStepGuideWrapper>
  )
}

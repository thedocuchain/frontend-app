import React from 'react'
import cn from 'classnames'

import { Header } from 'src/components/app/header'
import { Flex } from 'src/components/ui/grid'
import { useAppSelector } from 'src/store/hooks'
import { selectedDocument } from 'src/store/reducers/document/selectors'
import { DocumentViewComponent } from 'src/components/app/document-view-component'

import styles from './styles.module.css'

export function StepViewDocument({ inDashboard }: { inDashboard?: boolean }): JSX.Element {
  const document = useAppSelector(selectedDocument)

  return (
    <>
      {!inDashboard && <Header isDocumentPreview title={document.name} />}

      <Flex flex='1' className={cn(styles.wrapperDocumentView, { [styles.inDashboard]: inDashboard })}>
        <DocumentViewComponent isViewPage inDashboard={inDashboard} />
      </Flex>
    </>
  )
}

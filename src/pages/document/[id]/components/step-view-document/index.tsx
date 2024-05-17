import React from 'react'

import { Header } from 'src/components/app/header'
import { Flex } from 'src/components/ui/grid'
import { useAppSelector } from 'src/store/hooks'
import { selectedDocument } from 'src/store/reducers/document/selectors'

import styles from './styles.module.css'

export function StepViewDocument(): JSX.Element {
  const document = useAppSelector(selectedDocument)

  return (
    <>
      <Header isDocumentPreview title={document.title} />

      <Flex flex='1' className={styles.wrapperDocumentView}></Flex>
    </>
  )
}

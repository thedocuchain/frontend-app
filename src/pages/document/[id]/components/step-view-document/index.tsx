import React from 'react'

import { Header } from 'src/components/app/header'
import { Flex } from 'src/components/ui/grid'

import styles from './styles.module.css'

export function StepViewDocument(): JSX.Element {
  return (
    <>
      <Header isDocumentPreview title={'Document name'} />

      <Flex flex='1' className={styles.wrapperDocumentView}></Flex>
    </>
  )
}

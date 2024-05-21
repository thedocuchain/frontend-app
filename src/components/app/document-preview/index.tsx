import React from 'react'

import { Column, Row, RowCenter } from 'src/components/ui/grid'
import { DocumentType } from 'src/store/reducers/document/types'
import { Text } from 'src/components/ui/typography'
import { IconFile, IconUsers } from 'src/icons'
import { PdfViewPage } from 'src/components/app/pdf-view-page'

import styles from './styles.module.css'

export function DocumentPreview(props: { document: DocumentType }) {
  const { id, signers, pages } = props.document
  return (
    <Column>
      <RowCenter className={styles.wrapperImage}>
        <PdfViewPage isDocumentPreview />
      </RowCenter>
      <Column className={styles.textBlock}>
        <Row className={styles.textBlock}>
          <Text theme={'label-2'}>Document ID:</Text>
          <Text theme={'body-3'}>{id}</Text>
        </Row>
        <Row className={styles.iconBlock}>
          <IconUsers />
          <Text theme={'body-3'}>{signers.length} signers</Text>
        </Row>
        <Row className={styles.iconBlock}>
          <IconFile />
          <Text theme={'body-3'}>{pages} pages</Text>
        </Row>
      </Column>
    </Column>
  )
}

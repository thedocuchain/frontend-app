import React, { useState } from 'react'
import cn from 'classnames'

import { Text } from 'src/components/ui/typography'
import { Column, Row } from 'src/components/ui/grid'
import { MockPageSidePanel } from 'src/components/ui/mock-page-side-panel'
import { useAppSelector } from 'src/store/hooks'
import { selectedImageLinkMemo } from 'src/store/reducers/document/selectors'
import { IconFile, IconUsers } from 'src/icons'
import { DocumentType } from 'src/store/reducers/document/types'
import { Loader } from 'src/components/ui/loader'

import styles from './styles.module.css'

export function DocumentPreview(props: { document: DocumentType }) {
  const { shortId, users, pagesCount } = props.document
  const signers = users.filter((el) => el.role === 'signer')
  const [isLoading, setLoading] = useState(true)
  const [isError, setError] = useState(false)
  const imageLink = useAppSelector(selectedImageLinkMemo)

  return (
    <Column>
      <div className={styles.wrapperImage}>
        {isLoading && (
          <div className={styles.loader}>
            <Loader size={32} />
          </div>
        )}
        {isError && <MockPageSidePanel className={styles.wrapperError} />}
        <div className={cn(styles.img, { [styles.imgError]: isError || isLoading })}>
          <img
            onError={() => {
              setError(true)
              setLoading(false)
            }}
            onLoad={() => {
              setLoading(false)
            }}
            width={146}
            height={190}
            src={imageLink}
            alt=''
          />
        </div>
      </div>
      <Column className={styles.textBlock}>
        <Row className={styles.textBlock}>
          <Text theme={'label-2'}>Document ID:</Text>
          <Text theme={'body-3'}>{shortId.toUpperCase()}</Text>
        </Row>
        <Row className={styles.iconBlock}>
          <IconUsers />
          <Text theme={'body-3'}>
            {signers.length} {signers.length > 1 ? 'signers' : 'signer'}
          </Text>
        </Row>
        <Row className={styles.iconBlock}>
          <IconFile />
          <Text theme={'body-3'}>
            {pagesCount} {pagesCount > 1 ? 'pages' : 'page'}
          </Text>
        </Row>
      </Column>
    </Column>
  )
}

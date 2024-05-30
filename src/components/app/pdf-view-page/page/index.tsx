'use client'

import { Page } from 'react-pdf'
import React from 'react'

import styles from './styles.module.css'

export function PageView(props: { index: number; containerWidth?: number; maxWidth: number }) {
  const { index, containerWidth, maxWidth } = props
  // const documentData = useAppSelector(selectedDocument)
  // const isLastPage = documentData.pages === index + 1
  const width = containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth

  return (
    <Page className={styles.page} width={width} pageNumber={index + 1}>
      {/* {isLastPage && <GuideLabel positionY={documentData.xOffset} title={'Sign'} />} */}

      {/* {isLastPage && ( */}
      {/*  <div className={styles.mockSignatures} style={{ top: documentData.xOffset }}> */}
      {/*    {documentData.users.map((item, index) => ( */}
      {/*      <ParticipantSignatureDetails */}
      {/*        // isJustCreated={true} */}
      {/*        isEdited={true} */}
      {/*        isError={false} */}
      {/*        key={`${item.email}${index}`} */}
      {/*        participant={item} */}
      {/*        index={index} */}
      {/*      /> */}
      {/*    ))} */}
      {/*  </div> */}
      {/* )} */}
    </Page>
  )
}

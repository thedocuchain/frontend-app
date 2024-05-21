'use client'

import { Page } from 'react-pdf'
import cn from 'classnames'
import React from 'react'
import { useEvent } from '@coxy/utils/dist/use/use-event'

import { useIsInViewport } from 'src/utils/use/use-is-in-viewport'

import styles from '../styles.module.css'

export function PageView(props: {
  isSidePanel?: boolean
  isDocumentPreview?: boolean
  index: number
  id: string
  containerWidth?: number
  maxWidth: number
}) {
  const { isSidePanel, isDocumentPreview, index, id, containerWidth, maxWidth } = props

  const isInVP = useIsInViewport(id)
  // const documentData = useAppSelector(selectedDocument)
  // const isLastPage = documentData.pages === index + 1

  const handleClick = useEvent((e: Event) => {
    e.preventDefault()

    if (!isSidePanel) return
    if (isDocumentPreview) return

    const element = document.getElementById(`page_${index + 1}`)
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })

  return (
    <Page
      className={cn(styles.page, {
        [styles.sidePanelPage]: isSidePanel,
        [styles.isDocumentPreview]: isDocumentPreview,
        [styles.activePage]: isSidePanel && isInVP,
      })}
      pageNumber={index + 1}
      onClick={handleClick}
      width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
    >
      {(isSidePanel || isDocumentPreview) && <div className={styles.nonclickOverlay} />}

      {/* {!isSidePanel && isLastPage && <GuideLabel positionY={documentData.xOffset} title={'Sign'} />} */}

      {/* {!isSidePanel && isLastPage && ( */}
      {/*  <div className={styles.mockSignatures} style={{ top: documentData.xOffset }}> */}
      {/*    {documentData.signers.map((item, index) => ( */}
      {/*      <ParticipantSignatureDetails */}
      {/*        isJustCreated={true} */}
      {/*        // isEdited={true} */}
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

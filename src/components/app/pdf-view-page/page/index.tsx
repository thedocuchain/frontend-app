'use client'

import { Page } from 'react-pdf'
import cn from 'classnames'

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

  return (
    <Page
      className={cn(styles.page, {
        [styles.sidePanelPage]: isSidePanel,
        [styles.isDocumentPreview]: isDocumentPreview,
        [styles.activePage]: isSidePanel && isInVP,
      })}
      pageNumber={index + 1}
      width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
    >
      {/* {index === 3 && ( */}
      {/*  <div */}
      {/*    className={styles.mockSignatures} */}
      {/*    // style={{ top: documentData.xOffset }} */}
      {/*  > */}
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

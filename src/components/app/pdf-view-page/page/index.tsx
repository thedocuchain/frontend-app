'use client'

import { Page } from 'react-pdf'
import React from 'react'
import { useRouter } from 'next/router'

import { selectedDocument } from 'src/store/reducers/document/selectors'
import { useAppSelector } from 'src/store/hooks'
import { ParticipantSignatureDetails } from 'src/components/app/document-view-component/components/edit-tools'
import { GuideLabel } from 'src/components/app/document-view-component/components/step-by-step-guide/components/guide-label'
import { DocumentStatuses } from 'src/store/reducers/document/types'

import styles from './styles.module.css'

export function PageView(props: { isLoading?: boolean; index: number; containerWidth?: number; maxWidth: number }) {
  const { index, containerWidth, maxWidth, isLoading } = props
  const documentData = useAppSelector(selectedDocument)
  const signers = documentData.users.filter((el) => el.role === 'signer')
  const isSignersOnPage = signers.some((el) => el.signatures[0].pageNumber === index + 1)
  const isJustCreated = documentData.status === DocumentStatuses.RECIPIENT_ADDED
  const router = useRouter()
  const signerId = router.query.signerId as string
  const width = containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth

  // todo fix
  const pdfRatio = 1103 / 842

  return (
    <Page className={styles.page} width={width} pageNumber={index + 1}>
      {isSignersOnPage && (
        <>
          {signers.map((item, index) => (
            <React.Fragment key={item.id}>
              {signerId === item.id && (
                <GuideLabel positionY={item.signatures[0].yCoordinate * pdfRatio} title={'Sign'} />
              )}

              <ParticipantSignatureDetails
                isJustCreated={isJustCreated && !signerId && !item.signatures[0].signed}
                isEdited={!isJustCreated && signerId === item.id && !item.signatures[0].signed}
                isError={false}
                participant={item}
                index={index}
                isLoading={isLoading}
                pageWidth={width}
              />
            </React.Fragment>
          ))}
        </>
      )}
    </Page>
  )
}

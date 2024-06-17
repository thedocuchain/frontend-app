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
  const signers = documentData.users.filter(
    (el) => el.role === 'signer' && !el.signatures[0].signed && el.signatures[0].pageNumber === index + 1,
  )
  const router = useRouter()
  const isJustCreated = documentData.status === DocumentStatuses.RECIPIENT_ADDED

  const signerId = router.query.userId as string
  const width = containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth

  const document = useAppSelector(selectedDocument)
  const heightRatio = (780 * (document.height / document.width) * 9) / 9 / document.height

  return (
    <Page className={styles.page} width={width} pageNumber={index + 1}>
      {signers && (
        <>
          {signers.map((item, index) => (
            <React.Fragment key={item.id}>
              {signerId === item.id && (
                <GuideLabel positionY={item.signatures[0].yCoordinate * heightRatio} title={'Sign'} />
              )}

              <ParticipantSignatureDetails
                isJustCreated={isJustCreated && !signerId}
                isActiveSignature={!isJustCreated && signerId === item.id}
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

'use client'

import { Page } from 'react-pdf'
import React from 'react'
import { useRouter } from 'next/router'

import { selectedDocument } from 'src/store/reducers/document/selectors'
import { useAppSelector } from 'src/store/hooks'
import { GuideLabel } from 'src/components/app/document-view-component/components/step-by-step-guide/components/guide-label'
import { DocumentStatuses } from 'src/store/reducers/document/types'
import { ParticipantSignatureDetails } from 'src/components/app/document-view-component/components/participant-signature-details'

import { User } from 'src/store/reducers/document/types'

import styles from './styles.module.css'

const MIN_WIDGET_GAP = 150
const PAGE_FLOOR = 40

function getSignatureOffsets(signers: User[], heightRatio: number): Record<string, number> {
  const minGap = MIN_WIDGET_GAP / heightRatio
  const offsets: Record<string, number> = {}

  const sorted = signers
    .map((signer) => ({ id: signer.id, y: signer.signatures[0].yCoordinate }))
    .sort((a, b) => b.y - a.y)

  let lastY: number | null = null
  for (const item of sorted) {
    let y = item.y
    if (lastY !== null && y > lastY - minGap) y = lastY - minGap
    if (y < PAGE_FLOOR) y = PAGE_FLOOR
    offsets[item.id] = y - item.y
    lastY = y
  }

  return offsets
}

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

  // The backend spaces signers ~70pt apart, but the interactive signature widget is
  // taller than that, so several signers on one page overlap. Nudge them apart on
  // screen only — the final PDF is drawn from the backend coordinates regardless.
  const signatureOffsets = getSignatureOffsets(signers, heightRatio)

  return (
    <Page className={styles.page} width={width} pageNumber={index + 1}>
      {signers && (
        <>
          {signers.map((item, index) => (
            <React.Fragment key={item.id}>
              {signerId === item.id && (
                <GuideLabel
                  positionY={(item.signatures[0].yCoordinate + (signatureOffsets[item.id] ?? 0)) * heightRatio}
                  title={'Sign'}
                />
              )}

              <ParticipantSignatureDetails
                isJustCreated={isJustCreated && !signerId}
                isActiveSignature={!isJustCreated && signerId === item.id}
                participant={item}
                index={index}
                isLoading={isLoading}
                pageWidth={width}
                offsetY={signatureOffsets[item.id] ?? 0}
              />
            </React.Fragment>
          ))}
        </>
      )}
    </Page>
  )
}

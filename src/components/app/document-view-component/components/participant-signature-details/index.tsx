import cn from 'classnames'
import React from 'react'
import { useRouter } from 'next/router'

import { colorsBorders, indexToColorIndex } from 'src/components/app/avatar'
import { User } from 'src/store/reducers/document/types'
import { Tooltip } from 'src/components/ui/tooltip'
import { usePageRatio } from 'src/utils/use/use-page-ratio'
import { useAppSelector } from 'src/store/hooks'
import { selectedIsSignError } from 'src/store/reducers/signature'
import { selectedDocument } from 'src/store/reducers/document/selectors'
import { DateBlock, Signature } from 'src/components/app/document-view-component/components/edit-tools'
import { getScaleFactor } from 'src/utils/page-ratio'

import styles from './styles.module.css'

type ParticipantSignatureDetailsProps = {
  participant: User
  index: number
  isJustCreated?: boolean
  isActiveSignature?: boolean
  isLoading?: boolean
  pageWidth: number
}

export function ParticipantSignatureDetails(props: ParticipantSignatureDetailsProps) {
  const { name, signatures, id } = props.participant
  const { isJustCreated, isActiveSignature, isLoading, pageWidth } = props
  const isSignError = useAppSelector(selectedIsSignError) && isActiveSignature

  const router = useRouter()
  const signerId = router.query.userId as string

  const document = useAppSelector(selectedDocument)
  const [pageRatio] = usePageRatio(isLoading, pageWidth)
  const heightRatio = (780 * (document.height / document.width) * 9) / 9 / document.height

  const index = indexToColorIndex(props.index)
  const colorBorder = colorsBorders[index]
  const style = isJustCreated ? { backgroundColor: `${colorBorder}14`, borderColor: `${colorBorder}` } : null

  const isNeedToScale = heightRatio < 1 || document.width > document.height
  const scaleFactor = getScaleFactor(pageRatio)
  const scaleSize = isNeedToScale ? heightRatio - (1 - pageRatio) - scaleFactor : pageRatio

  return (
    <div
      id={index === 0 ? 'participant-wrapper' : ''}
      className={cn('flex-row', styles.participantWrapper)}
      style={{
        bottom: signatures[0].yCoordinate * heightRatio * pageRatio - 60,
      }}
    >
      <div className='flex-row w100-p relative' id={signerId === id ? 'target-id' : ''}>
        <DateBlock style={style} isActiveSignature={isActiveSignature} scaleSize={scaleSize} />

        <div
          className={styles.signatureWrapperContainer}
          style={{
            left: '65.2%',
          }}
        >
          <Tooltip isSmall isError={isSignError} isShow={isSignError} content={'Signature is required.'}>
            <Signature isActiveSignature={isActiveSignature} style={style} name={name} scaleSize={scaleSize} />
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

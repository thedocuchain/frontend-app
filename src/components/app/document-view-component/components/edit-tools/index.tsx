import cn from 'classnames'
import React, { useState } from 'react'
import { useEvent } from '@coxy/utils/dist/use/use-event'
import { format } from 'date-fns'
import { randomNumber } from '@coxy/utils'
import { useRouter } from 'next/router'

import { colorsBorders, indexToColorIndex } from 'src/components/app/avatar'
import { Text } from 'src/components/ui/typography'
import { Column, RowCenter } from 'src/components/ui/grid'
import { IconEdit, IconRefreshSignature } from 'src/icons'
import { User } from 'src/store/reducers/document/types'
import { Space } from 'src/components/ui/space'
import { TextSize } from 'components/app/text-size'
import { Tooltip } from 'src/components/ui/tooltip'
import { fontsSignatures } from 'src/components/app/document-view-component/components/edit-tools/fonts'
import { toIsoString } from 'src/utils/convert-time'
import { usePageRatio } from 'src/utils/use/use-page-ratio'
import { useAppDispatch, useAppSelector } from 'src/store/hooks'
import {
  selectedIsSigned,
  selectedIsSignError,
  selectedSignatureFont,
  selectedSignDate,
  setSignatureFont,
  setSignDate,
  setSigned,
} from 'src/store/reducers/signature'
import { selectedDocument } from 'src/store/reducers/document/selectors'

import styles from './styles.module.css'

type DateBlockProps = {
  style: React.CSSProperties
  isActiveSignature: boolean
}

export function DateBlock(props: DateBlockProps) {
  const { style, isActiveSignature } = props
  const signDate = useAppSelector(selectedSignDate)

  if (signDate && isActiveSignature)
    return (
      <div className={styles.dateWrapperSigned}>
        <Text theme={'body-3'}>{format(new Date(signDate), 'MM.dd.yyyy')}</Text>
      </div>
    )

  return (
    <div className={styles.dateWrapper} style={style}>
      <Text theme={'label-2'} className='color-text-secondary'>
        MM.DD.YYYY
      </Text>
    </div>
  )
}

type SignatureProps = {
  style: React.CSSProperties
  isActiveSignature: boolean
  name: string
}

export function Signature(props: SignatureProps) {
  const { style, isActiveSignature, name } = props
  const isSigned = useAppSelector(selectedIsSigned) && isActiveSignature
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(false)

  const cl = cn(styles.signatureWrapper, {
    [styles.isEdited]: isActiveSignature,
    [styles.isSigned]: isSigned,
  })

  const handeSignDocument = useEvent(async () => {
    if (!isActiveSignature) return
    setIsLoading(true)
    const newIndex = randomNumber(0, fonts.length)
    const isoDate = toIsoString(new Date())

    if (isSigned) {
      await dispatch(setSignatureFont(fonts[newIndex]))
      setIsLoading(false)
      return
    }

    await dispatch(setSigned(true))
    await dispatch(setSignatureFont(fonts[newIndex]))
    await dispatch(setSignDate(isoDate))
    setIsLoading(false)
  })

  const fonts = Object.keys(fontsSignatures)
  const fontStyle = useAppSelector(selectedSignatureFont)

  return (
    <div className={cl} style={style} onClick={handeSignDocument}>
      {!isActiveSignature && !isSigned && (
        <RowCenter className='gap4'>
          <IconEdit className={styles.icon} />
          <Text theme={'label-2'} className='color-text-secondary'>
            Signature
          </Text>
        </RowCenter>
      )}

      {isSigned && isActiveSignature && (
        <Column className='align-center jc-between h100-p text-center'>
          {!isLoading && (
            <TextSize maxLen={20} className={fontStyle} minSize={16}>
              {name}
            </TextSize>
          )}

          <RowCenter className={cn('gap6', styles.changeBlock)}>
            <IconRefreshSignature className={styles.iconEdited} />
            <Text theme={'button-standard'} className={cn('color-link-default', styles.textHover)}>
              Change signature
            </Text>
          </RowCenter>
        </Column>
      )}

      {isActiveSignature && !isSigned && (
        <RowCenter className='gap6'>
          <IconEdit className={styles.iconEdited} />
          <Text theme={'button-sm'} className={cn('color-link-default', styles.textHover)}>
            Click here to sign
          </Text>
        </RowCenter>
      )}
    </div>
  )
}

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
  const [pageRatio, right] = usePageRatio(isLoading, pageWidth)
  const heightRatio = (780 * (document.height / document.width) * 9) / 9 / document.height

  const index = indexToColorIndex(props.index)
  const colorBorder = colorsBorders[index]
  const style = isJustCreated ? { backgroundColor: `${colorBorder}14`, borderColor: `${colorBorder}` } : null

  const scale = heightRatio < 1 && document.height > document.width ? pageRatio - 0.25 : pageRatio

  return (
    <div
      id={'participant-wrapper'}
      className={cn('flex-row', styles.participantWrapper)}
      style={{
        transform: `scale(${scale})`,
        bottom: signatures[0].yCoordinate * heightRatio * pageRatio - 60,
        right: `-${right}px`,
      }}
    >
      <Column />

      <div className='flex-row' id={signerId === id ? 'target-id' : ''}>
        <DateBlock style={style} isActiveSignature={isActiveSignature} />
        <Space size={80} horizontal />

        <Tooltip isError={isSignError} isShow={isSignError} content={'Signature is required.'}>
          <Signature isActiveSignature={isActiveSignature} style={style} name={name} />
        </Tooltip>
      </div>
    </div>
  )
}

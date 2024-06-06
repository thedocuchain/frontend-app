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

import styles from './styles.module.css'

type ComponentProps = {
  index: number
  isJustCreated?: boolean
  isEdited?: boolean
  isSigned?: boolean
  setSigned?: (boolean) => void
  dateSigned?: string
  name?: string
  date?: string
  setDate?: (string) => void
}

export function DateBlock(props: ComponentProps) {
  const { isJustCreated, dateSigned, index, date } = props
  const colorBorder = colorsBorders[index]
  const style = isJustCreated ? { backgroundColor: `${colorBorder}14`, borderColor: `${colorBorder}` } : null

  if (dateSigned || date)
    return (
      <div className={styles.dateWrapperSigned}>
        <Text theme={'body-3'}>{format(new Date(dateSigned || date), 'MM.dd.yyyy')}</Text>
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

export function Signature(props: ComponentProps) {
  const { isJustCreated, isEdited, isSigned, setSigned, index, name, setDate } = props
  const colorBorder = colorsBorders[index]
  const isSignedDone = isSigned && !isEdited

  const cl = cn(styles.signatureWrapper, {
    [styles.isEdited]: isEdited,
    [styles.isSigned]: isSigned,
    [styles.isSignedDone]: isSignedDone,
  })
  const style = isJustCreated ? { backgroundColor: `${colorBorder}14`, borderColor: `${colorBorder}` } : null

  const handeSignDocument = useEvent(() => {
    if (!isEdited) return

    if (isSigned) {
      const newIndex = randomNumber(0, fonts.length)
      setFontIndex(newIndex)
      setFont(fonts[newIndex])
      return
    }

    setSigned(true)
    setDate(toIsoString(new Date()))
  })

  const fonts = fontsSignatures
  const randomIndex = randomNumber(0, fonts.length)
  const [fontIndex, setFontIndex] = useState(randomIndex)
  const [font, setFont] = useState(fonts[fontIndex])

  return (
    <div className={cl} style={style} onClick={handeSignDocument}>
      {!isEdited && !isSigned && (
        <RowCenter className='gap4'>
          <IconEdit className={styles.icon} />
          <Text theme={'label-2'} className='color-text-secondary'>
            Signature
          </Text>
        </RowCenter>
      )}

      {isSigned && isEdited && (
        <Column className='align-center jc-between h100-p text-center'>
          <TextSize maxLen={20} className={font} minSize={16}>
            {name}
          </TextSize>

          <RowCenter className={cn('gap6', styles.changeBlock)}>
            <IconRefreshSignature className={styles.iconEdited} />
            <Text theme={'button-standard'} className={cn('color-link-default', styles.textHover)}>
              Change signature
            </Text>
          </RowCenter>
        </Column>
      )}

      {isSignedDone && (
        <Column className='column-center'>
          <TextSize maxLen={20} className={font} minSize={16}>
            {name}
          </TextSize>
        </Column>
      )}

      {isEdited && !isSigned && (
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
  isEdited?: boolean
  isError?: boolean
  isLoading?: boolean
  pageWidth: number
}

export function ParticipantSignatureDetails(props: ParticipantSignatureDetailsProps) {
  const { name, signatures, id } = props.participant
  const { isJustCreated, isEdited, isError, isLoading, pageWidth } = props
  const [isSigned, setSigned] = useState(signatures[0].signed)
  const [date, setDate] = useState('')
  const index = indexToColorIndex(props.index)
  const dateSigned = signatures && signatures[0]?.signDate

  const router = useRouter()
  const signerId = router.query.signerId as string

  const [pageRatio, right] = usePageRatio(isLoading, pageWidth)

  // todo fix pdfRatio
  const pdfRatio = 1103 / 842

  return (
    <div
      id={'participant-wrapper'}
      className={cn('flex-row', styles.participantWrapper)}
      style={{
        transform: `scale(${pageRatio})`,
        bottom: signatures[0].yCoordinate * pdfRatio * pageRatio - 60 * pageRatio,
        right: `-${right}px`,
      }}
    >
      <Column />

      <div className='flex-row' id={signerId === id ? 'target-id' : ''}>
        <DateBlock
          date={date}
          isJustCreated={isJustCreated}
          isEdited={isEdited}
          index={index}
          dateSigned={dateSigned}
        />
        <Space size={80} horizontal />

        <Tooltip isError={isError} isShow={isError} content={'Signature is required.'}>
          <Signature
            setDate={setDate}
            setSigned={setSigned}
            isSigned={isSigned}
            isJustCreated={isJustCreated}
            isEdited={isEdited}
            index={index}
            name={name}
          />
        </Tooltip>
      </div>
    </div>
  )
}

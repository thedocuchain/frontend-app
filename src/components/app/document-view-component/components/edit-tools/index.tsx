import cn from 'classnames'
import React, { useState } from 'react'
import { useEvent } from '@coxy/utils/dist/use/use-event'
import { format } from 'date-fns'
import { randomNumber } from '@coxy/utils'

import { Text } from 'src/components/ui/typography'
import { Column, RowCenter } from 'src/components/ui/grid'
import { IconEdit, IconRefreshSignature } from 'src/icons'
import { toIsoString } from 'src/utils/convert-time'
import { useAppDispatch, useAppSelector } from 'src/store/hooks'
import {
  selectedIsSigned,
  selectedSignatureFont,
  selectedSignDate,
  setSignatureFont,
  setSignDate,
  setSigned,
} from 'src/store/reducers/signature'
import { fontsSignatures } from 'src/components/app/document-view-component/components/edit-tools/fonts'

import styles from './styles.module.css'

type DateBlockProps = {
  style: React.CSSProperties
  isActiveSignature: boolean
  scaleSize: number
}

export function DateBlock(props: DateBlockProps) {
  const { style, isActiveSignature, scaleSize } = props
  const signDate = useAppSelector(selectedSignDate)

  const stylesDateBlock = {
    width: `calc(110px * ${scaleSize})`,
    height: `calc(36px * ${scaleSize})`,
    padding: `calc(8px * ${scaleSize}) calc(10px * ${scaleSize})`,
    right: `calc(50% - 67px * ${scaleSize})`,
    top: 0,
    borderRadius: `calc(10px * ${scaleSize})`,
  }

  const fontSizeStyle = {
    fontSize: `calc(18px * ${scaleSize})`,
  }

  if (signDate && isActiveSignature)
    return (
      <div className={styles.dateWrapperSigned} style={stylesDateBlock}>
        <Text theme='body-3' style={fontSizeStyle}>
          {format(new Date(signDate), 'MM.dd.yyyy')}
        </Text>
      </div>
    )

  return (
    <div className={styles.dateWrapper} style={{ ...style, ...stylesDateBlock }}>
      <Text theme={'label-2'} className='color-text-secondary' style={fontSizeStyle}>
        MM.DD.YYYY
      </Text>
    </div>
  )
}

type SignatureProps = {
  style: React.CSSProperties
  isActiveSignature: boolean
  name: string
  scaleSize?: number
}

export function Signature(props: SignatureProps) {
  const { style, isActiveSignature, name, scaleSize } = props
  const isSigned = useAppSelector(selectedIsSigned) && isActiveSignature
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(false)

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

  // todo ПОДПИСЬ проверить fontStyle после Славы
  // const fontStyle = 'engagement-regular'

  const cl = cn(styles.signatureWrapper, {
    [styles.isEdited]: isActiveSignature,
    [styles.isSigned]: isSigned,
  })

  // dynamic styles
  const stylesSignature = {
    ...style,
    width: scaleSize ? `calc(216px * ${scaleSize})` : '216px',
    height: scaleSize ? `calc(80px * ${scaleSize})` : '80px',
    padding: scaleSize ? `calc(8px * ${scaleSize}) calc(10px * ${scaleSize})` : '8px 10px',
    borderRadius: scaleSize ? `calc(10px * ${scaleSize})` : '10px',
  }

  const editedStyles = {
    boxShadow: scaleSize ? `0 0 0 calc(4px * ${scaleSize}) #9fe8703d` : 'var(--shadow-focus-accent)',
    border: scaleSize ? `calc(1px * ${scaleSize}) solid var(--bg-accent)` : '1px solid var(--bg-accent)',
    padding: scaleSize ? `0 calc(10px * ${scaleSize}) calc(2px * ${scaleSize})` : '0 10px 2px',
  }

  const fontSizeStyle = {
    fontSize: scaleSize ? `calc(14px * ${scaleSize})` : '14px',
    lineHeight: '100%',
  }

  const iconSize = scaleSize ? 16 * scaleSize : 16

  return (
    <div
      className={cl}
      style={isActiveSignature ? { ...stylesSignature, ...editedStyles } : stylesSignature}
      onClick={handeSignDocument}
    >
      {!isActiveSignature && !isSigned && (
        <RowCenter className='gap4'>
          <IconEdit width={iconSize} height={iconSize} className={styles.icon} />
          <Text theme={'label-2'} className='color-text-secondary' style={fontSizeStyle}>
            Signature
          </Text>
        </RowCenter>
      )}

      {isSigned && isActiveSignature && (
        <Column className='align-center jc-between h100-p text-center'>
          {!isLoading && (
            <div
              style={{ lineHeight: '120%', fontSize: scaleSize ? `calc(26px * ${scaleSize})` : '26px' }}
              className={fontStyle}
            >
              {name}
              {/* alisa */}
              {/* http://localhost:3000/doc/sign/8a131f53-8231-459a-9b78-6c3d4492e99f?userId=7e5f4770-5e35-4ce4-baa3-ef6e4f6c80c7 */}
              {/* todo ПОДПИСЬ проверить размер блока и ставится ли подпись посередине блока после Славы */}
            </div>
          )}

          <RowCenter className={cn('gap6', styles.changeBlock)}>
            <IconRefreshSignature width={iconSize} height={iconSize} className={styles.iconEdited} />
            <Text
              style={fontSizeStyle}
              theme={'button-standard'}
              className={cn('color-link-default', styles.textHover)}
            >
              Change signature
            </Text>
          </RowCenter>
        </Column>
      )}

      {isActiveSignature && !isSigned && (
        <RowCenter className='gap6'>
          <IconEdit width={iconSize} height={iconSize} className={styles.iconEdited} />
          <Text theme={'button-sm'} className={cn('color-link-default', styles.textHover)} style={fontSizeStyle}>
            Click here to sign
          </Text>
        </RowCenter>
      )}
    </div>
  )
}

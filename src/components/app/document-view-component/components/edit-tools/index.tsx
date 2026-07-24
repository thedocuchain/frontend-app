import cn from 'classnames'
import React, { useRef, useState } from 'react'
import { useEvent } from '@coxy/utils/dist/use/use-event'
import { format } from 'date-fns'
import { randomNumber } from '@coxy/utils'

import { Text } from 'src/components/ui/typography'
import { Column, RowCenter } from 'src/components/ui/grid'
import { IconCheck, IconEdit, IconRefreshSignature, IconUpload } from 'src/icons'
import { toIsoString } from 'src/utils/convert-time'
import { selectedAccount } from 'src/store/reducers/account'
import { useAppDispatch, useAppSelector } from 'src/store/hooks'
import {
  selectedIsSigned,
  selectedSignatureFont,
  selectedSignDate,
  selectedSignImage,
  setSignatureFont,
  setSignDate,
  setSignImage,
  setSigned,
} from 'src/store/reducers/signature'
import { fontsSignatures } from 'src/components/app/document-view-component/components/edit-tools/fonts'
import { DrawSignatureModal } from 'src/components/app/document-view-component/components/edit-tools/draw-signature-modal'
import { fileToSignatureDataUrl } from 'src/components/app/document-view-component/components/edit-tools/signature-image'

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
  const signImage = useAppSelector(selectedSignImage)
  const account = useAppSelector(selectedAccount)
  const savedSignature = account?.signImage || account?.signFont ? account : null
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [isDrawModalVisible, setDrawModalVisible] = useState(false)
  const [uploadError, setUploadError] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const fonts = Object.keys(fontsSignatures)
  const fontStyle = useAppSelector(selectedSignatureFont)

  const sz = (value: number) => (scaleSize ? `calc(${value}px * ${scaleSize})` : `${value}px`)

  const ensureSigned = async () => {
    if (isSigned) return
    await dispatch(setSigned(true))
    await dispatch(setSignDate(toIsoString(new Date())))
  }

  const applySavedSignature = useEvent(async (event?: React.MouseEvent) => {
    event?.stopPropagation()
    if (!savedSignature) return
    setIsLoading(true)
    setUploadError(false)
    if (savedSignature.signImage) {
      await dispatch(setSignImage(savedSignature.signImage))
      if (!fontStyle) await dispatch(setSignatureFont(fonts[randomNumber(0, fonts.length - 1)]))
    } else {
      await dispatch(setSignImage(null))
      await dispatch(setSignatureFont(savedSignature.signFont))
    }
    await ensureSigned()
    setIsLoading(false)
  })

  const handeSignDocument = useEvent(async () => {
    if (!isActiveSignature || isSigned) return
    if (savedSignature) {
      await applySavedSignature()
      return
    }
    setIsLoading(true)
    await dispatch(setSignatureFont(fonts[randomNumber(0, fonts.length - 1)]))
    await ensureSigned()
    setIsLoading(false)
  })

  const handleChangeSignature = useEvent(async (event: React.MouseEvent) => {
    event.stopPropagation()
    setIsLoading(true)
    setUploadError(false)
    await dispatch(setSignImage(null))
    await dispatch(setSignatureFont(fonts[randomNumber(0, fonts.length - 1)]))
    setIsLoading(false)
  })

  const handleOpenDraw = useEvent((event: React.MouseEvent) => {
    event.stopPropagation()
    setDrawModalVisible(true)
  })

  const handleUploadClick = useEvent((event: React.MouseEvent) => {
    event.stopPropagation()
    fileInputRef.current?.click()
  })

  const applySignatureImage = useEvent(async (dataUrl: string) => {
    setUploadError(false)
    await dispatch(setSignImage(dataUrl))
    if (!fontStyle) {
      await dispatch(setSignatureFont(fonts[randomNumber(0, fonts.length - 1)]))
    }
    await ensureSigned()
    setDrawModalVisible(false)
  })

  const handleFileChange = useEvent(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    try {
      await applySignatureImage(await fileToSignatureDataUrl(file))
    } catch (error) {
      console.error('Failed to process the signature image', error)
      setUploadError(true)
    }
  })

  const cl = cn(styles.signatureWrapper, {
    [styles.isEdited]: isActiveSignature,
    [styles.isSigned]: isSigned,
  })

  // dynamic styles
  const stylesSignature = {
    ...style,
    width: sz(216),
    height: sz(isSigned ? 136 : 80),
    padding: `${sz(8)} ${sz(10)}`,
    borderRadius: sz(10),
  }

  const editedStyles = {
    boxShadow: scaleSize ? `0 0 0 calc(4px * ${scaleSize}) #9fe8703d` : 'var(--shadow-focus-accent)',
    border: scaleSize ? `calc(1px * ${scaleSize}) solid var(--bg-accent)` : '1px solid var(--bg-accent)',
    padding: isSigned ? `${sz(8)} ${sz(10)}` : `0 ${sz(10)} ${sz(2)}`,
  }

  const fontSizeStyle = {
    fontSize: sz(14),
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
        <Column className='align-center jc-between h100-p text-center w100-p'>
          {!isLoading &&
            (uploadError ? (
              <Text theme={'body-3'} className='color-text-error' style={fontSizeStyle}>
                Unsupported image. Use a PNG or JPEG file.
              </Text>
            ) : signImage ? (
              <img
                src={signImage}
                alt='Signature'
                className={styles.signImage}
                style={{ maxHeight: sz(44), maxWidth: sz(180) }}
              />
            ) : (
              <div style={{ lineHeight: '120%', fontSize: sz(26) }} className={fontStyle}>
                {name}
              </div>
            ))}

          <div className={styles.actionsBlock} style={{ gap: sz(6) }}>
            {savedSignature && (
              <button className={styles.actionRow} style={{ gap: sz(6) }} onClick={applySavedSignature}>
                <IconCheck width={iconSize} height={iconSize} className={styles.iconEdited} />
                <Text
                  style={fontSizeStyle}
                  theme={'button-standard'}
                  className={cn('color-link-default', 'white-space-nowrap', styles.actionText)}
                >
                  Use my signature
                </Text>
              </button>
            )}

            <button className={styles.actionRow} style={{ gap: sz(6) }} onClick={handleChangeSignature}>
              <IconRefreshSignature width={iconSize} height={iconSize} className={styles.iconEdited} />
              <Text
                style={fontSizeStyle}
                theme={'button-standard'}
                className={cn('color-link-default', 'white-space-nowrap', styles.actionText)}
              >
                Change signature
              </Text>
            </button>

            <button className={styles.actionRow} style={{ gap: sz(6) }} onClick={handleOpenDraw}>
              <IconEdit width={iconSize} height={iconSize} className={styles.iconEdited} />
              <Text
                style={fontSizeStyle}
                theme={'button-standard'}
                className={cn('color-link-default', 'white-space-nowrap', styles.actionText)}
              >
                Draw signature
              </Text>
            </button>

            <button className={styles.actionRow} style={{ gap: sz(6) }} onClick={handleUploadClick}>
              <IconUpload width={iconSize} height={iconSize} className={styles.iconEdited} />
              <Text
                style={fontSizeStyle}
                theme={'button-standard'}
                className={cn('color-link-default', 'white-space-nowrap', styles.actionText)}
              >
                Upload signature
              </Text>
            </button>
          </div>
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

      {isActiveSignature && (
        <>
          <input
            ref={fileInputRef}
            type='file'
            accept='image/png,image/jpeg'
            className={styles.fileInput}
            onChange={handleFileChange}
          />

          <DrawSignatureModal
            visible={isDrawModalVisible}
            onClose={() => setDrawModalVisible(false)}
            onSave={applySignatureImage}
          />
        </>
      )}
    </div>
  )
}

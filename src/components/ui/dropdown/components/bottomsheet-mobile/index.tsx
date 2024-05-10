import React, { PropsWithChildren, ReactElement, useCallback, useId, useLayoutEffect, useState } from 'react'
import { Portal } from 'react-portal'
import cn from 'classnames'

import { IconBottomSheet } from 'src/icons'
import { Text } from 'src/components/ui/typography'

import styles from './styles.module.css'

export type BottomSheetProps = {
  visible: boolean
  onClose: () => void
  title: string
} & PropsWithChildren

export const BottomSheet = (props: BottomSheetProps): ReactElement => {
  const { onClose, visible, title } = props

  const handleClose = useCallback(() => {
    setDeleted(true)

    setTimeout(() => {
      setDeleted(false)
      onClose()
    }, 200)
  }, [props])

  const [isDeleted, setDeleted] = useState(false)
  const [height, setHeight] = useState(220)
  const id = useId()

  useLayoutEffect(() => {
    const popup = document.getElementById(id)

    if (popup) {
      const listLength = popup.children[2].children.length
      const elemHeight = Math.floor(popup.children[2].scrollHeight / listLength)

      if (listLength >= 5) {
        setHeight(elemHeight * 5 + 45)
        return
      }
      setHeight(elemHeight * listLength + 45)
    }
  }, [visible])

  if (typeof window === 'undefined') {
    return null
  }

  if (visible) {
    return (
      <Portal node={document.body}>
        <div className={styles.root}>
          <div className={styles.wrapperPopup}>
            <div className={styles.overlay} onClick={handleClose} />
            <div
              id={id}
              style={{ height: `${height}px` }}
              className={cn(styles.popup, {
                [styles.slideOut]: isDeleted,
              })}
            >
              <IconBottomSheet className={styles.iconBottomSheet} />
              <Text theme='headline-2' className={styles.titleMobile}>
                {title}
              </Text>

              {props.children}
            </div>
          </div>
        </div>
      </Portal>
    )
  }

  return null
}

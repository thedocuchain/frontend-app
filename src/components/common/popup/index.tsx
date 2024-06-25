import type { PropsWithChildren } from 'react'

import React, { useCallback, useEffect, useState } from 'react'
import cn from 'classnames'
import { Portal } from 'react-portal'
import { useEvent } from '@coxy/utils/dist/use/use-event'

import styles from './styles.module.css'

let savedScroll = 0
const elRootId = '__next'

export type PopupProps = {
  visible: boolean
  onClose: () => void
  className?: string
} & PropsWithChildren

export function Popup(props: PopupProps) {
  const handleResize = () => {
    const root = document.getElementById(elRootId)
    const height = document.body.offsetHeight
    root.style.height = `${height}px`
  }

  const [isVisible, setVisible] = useState(props.visible)
  const [isDeleted, setDeleted] = useState(false)

  const handleClose = useEvent(() => {
    setDeleted(true)

    setTimeout(() => {
      setVisible(false)
      setDeleted(false)
      props.onClose()
    }, 200)
  })

  const handleKeydown = useCallback(
    (event: KeyboardEvent) => {
      if (event.keyCode === 27) {
        handleClose()
      }
    },
    [handleClose],
  )

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const root = document.getElementById(elRootId)

    if (!root) {
      return
    }

    if (props.visible) {
      setVisible(true)

      savedScroll = window.scrollY
      const height = document.documentElement.clientHeight
      root.className = 'popup-open'
      root.style.height = `${height}px`
      root.style.minHeight = 'auto'

      root.scrollTop = savedScroll

      window.addEventListener('keydown', handleKeydown, false)
      window.addEventListener('resize', handleResize, false)
    }

    if (!props.visible && savedScroll !== undefined) {
      setVisible(false)

      root.className = ''
      root.style.height = 'inherit'
      root.style.minHeight = '100%'
      // root.style.marginTop = '0px'
      window.scrollTo(0, savedScroll)
      savedScroll = undefined
    }

    return () => {
      window.removeEventListener('keydown', handleKeydown, false)
      window.removeEventListener('resize', handleResize, false)
    }
  }, [props.visible])

  if (typeof window === 'undefined') {
    return null
  }

  if (isVisible && props.visible) {
    return (
      <Portal node={document.body}>
        <div className={styles.root}>
          <div id='popupWrapper' className={cn(styles.wrapperPopup, { [styles.fadeOut]: isDeleted })}>
            <div className={styles.overlay} onClick={handleClose} />
            <div
              id='popup'
              className={cn(styles.popup, props.className, {
                [styles.popupAnimation]: isVisible,
                [styles.slideOut]: isDeleted,
              })}
            >
              {props.children}
            </div>
          </div>
        </div>
      </Portal>
    )
  }

  return null
}

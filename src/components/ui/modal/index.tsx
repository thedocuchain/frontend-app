import React, { PropsWithChildren, ReactElement } from 'react'
import { Portal } from 'react-portal'

import styles from './styles.module.css'

export type ModalProps = {
  visible: boolean
  onClose: () => void
} & PropsWithChildren

export const Modal = (props: ModalProps): ReactElement | null => {
  const { visible, onClose } = props

  if (typeof window === 'undefined' || !visible) {
    return null
  }

  return (
    <Portal node={document.body}>
      <div className={styles.root}>
        <div className={styles.overlay} onClick={onClose} />
        <div className={styles.card} role='dialog'>
          {props.children}
        </div>
      </div>
    </Portal>
  )
}

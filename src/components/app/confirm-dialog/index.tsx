import React from 'react'

import { Modal } from 'src/components/ui/modal'
import { Text } from 'src/components/ui/typography'
import { Button } from 'src/components/ui/button'

import styles from './styles.module.css'

type ConfirmDialogProps = {
  visible: boolean
  title: string
  confirmText?: string
  cancelText?: string
  isLoading?: boolean
  onConfirm: () => void
  onClose: () => void
}

export function ConfirmDialog(props: ConfirmDialogProps) {
  const { visible, title, confirmText = 'Yes', cancelText = 'No', isLoading, onConfirm, onClose } = props

  return (
    <Modal visible={visible} onClose={onClose} className={styles.card}>
      <Text theme='headline-4' header='h2' className={styles.title}>
        {title}
      </Text>

      <div className={styles.actions}>
        <Button theme='secondary' onClick={onClose}>
          {cancelText}
        </Button>
        <Button onClick={onConfirm} isLoading={isLoading}>
          {confirmText}
        </Button>
      </div>
    </Modal>
  )
}

import React from 'react'

import { Modal } from 'src/components/ui/modal'
import { Text } from 'src/components/ui/typography'
import { Button } from 'src/components/ui/button'
import { Space } from 'src/components/ui/space'
import { IconClose } from 'src/icons'
import { ACCOUNT_FROZEN_MESSAGE, SUPPORT_EMAIL } from 'src/configs/common'

import styles from './styles.module.css'

type FrozenModalProps = {
  visible: boolean
  onClose: () => void
}

export function FrozenModal(props: FrozenModalProps) {
  const { visible, onClose } = props

  return (
    <Modal visible={visible} onClose={onClose} className={styles.modalCard}>
      <div className={styles.closeRow}>
        <IconClose className='on-click' onClick={onClose} />
      </div>

      <Text theme='headline-4' header='h2' className={styles.title}>
        Your account is frozen
      </Text>
      <Space size={12} />
      <Text theme='body-2' className={styles.description}>
        {ACCOUNT_FROZEN_MESSAGE}
      </Text>

      <Space size={24} />
      <Button theme='secondary' href={`mailto:${SUPPORT_EMAIL}`} className={styles.button}>
        Contact {SUPPORT_EMAIL}
      </Button>
      <Space size={10} />
      <Button onClick={onClose} className={styles.button}>
        Got it
      </Button>
    </Modal>
  )
}

import React from 'react'

import { Modal } from 'src/components/ui/modal'
import { Text } from 'src/components/ui/typography'
import { Button } from 'src/components/ui/button'
import { Space } from 'src/components/ui/space'
import { IconClose } from 'src/icons'

import styles from './styles.module.css'

type ReportModalProps = {
  visible: boolean
  isLoading: boolean
  onClose: () => void
  onCheck: () => void
  onReport: () => void
}

export function ReportModal(props: ReportModalProps) {
  const { visible, isLoading, onClose, onCheck, onReport } = props

  return (
    <Modal visible={visible} onClose={onClose} className={styles.modalCard}>
      <div className={styles.closeRow}>
        <IconClose className='on-click' onClick={onClose} />
      </div>

      <Text theme='headline-4' header='h2' className={styles.title}>
        Are you sure you want to report the document?
      </Text>
      <Space size={12} />
      <Text theme='body-2' className={styles.description}>
        The report function is used when the document and its signing participants are unknown to you. After you submit
        a report, the initiator’s access to our service will be temporarily restricted.
      </Text>

      <Space size={24} />
      <Button onClick={onCheck} className={styles.button}>
        Check the document
      </Button>
      <Space size={10} />
      <Button theme='secondary' onClick={onReport} isLoading={isLoading} className={styles.button}>
        Report the document
      </Button>
    </Modal>
  )
}

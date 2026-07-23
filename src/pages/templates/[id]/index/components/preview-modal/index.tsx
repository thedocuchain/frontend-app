import React from 'react'

import { ContractTemplate } from 'src/configs/templates'
import { Modal } from 'src/components/ui/modal'
import { Text } from 'src/components/ui/typography'
import { Button, ButtonIcon } from 'src/components/ui/button'
import { IconClose, IconEdit } from 'src/icons'
import { TemplateDoc } from 'src/pages/templates/components/template-doc'

import styles from './styles.module.css'

type PreviewModalProps = {
  template: ContractTemplate
  visible: boolean
  onClose: () => void
  onUse: () => void
}

export function PreviewModal({ template, visible, onClose, onUse }: PreviewModalProps) {
  return (
    <Modal visible={visible} onClose={onClose} className={styles.modalCard}>
      <div className={styles.header}>
        <Text theme='headline-2' header='h2'>
          {template.name} — full text
        </Text>
        <button type='button' className={styles.close} onClick={onClose}>
          <IconClose />
        </button>
      </div>

      <div className={styles.body}>
        <TemplateDoc template={template} full className={styles.doc} />
      </div>

      <div className={styles.footer}>
        <Text theme='body-3' className={styles.footerHint}>
          Scrolls through all {template.pages.length} pages · fields to fill are highlighted
        </Text>
        <Button theme='gradient' onClick={onUse} className={styles.footerButton}>
          <ButtonIcon stroke>
            <IconEdit />
          </ButtonIcon>
          Use this template &amp; sign
        </Button>
      </div>
    </Modal>
  )
}

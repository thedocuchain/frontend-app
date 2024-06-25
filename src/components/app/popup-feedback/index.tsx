import React from 'react'

import { Popup, PopupProps } from 'src/components/common/popup'
import { Column } from 'src/components/ui/grid'
import { Button } from 'src/components/ui/button'

import styles from './styles.module.css'

export function PopupFeedback(props: PopupProps) {
  return (
    <Popup visible={props.visible} onClose={props.onClose}>
      <Column className={styles.wrapper}></Column>

      <div className={styles.buttonWrapper}>
        <Button theme='primary' onClick={props.onClose}>
          Send
        </Button>
      </div>
    </Popup>
  )
}

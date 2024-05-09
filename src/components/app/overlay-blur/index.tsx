import React, { PropsWithChildren } from 'react'

import { ProgressSpinner } from 'src/components/app/progress-spinner'

import styles from './styles.module.css'

type ComponentProps = {
  visible?: boolean
  title?: string
}

export function OverlayBlur(props: PropsWithChildren & ComponentProps) {
  if (props.visible === false) {
    return null
  }

  return (
    <div className={styles.overlay}>
      <ProgressSpinner title={props.title} />
    </div>
  )
}

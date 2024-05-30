import React, { PropsWithChildren } from 'react'

import styles from './styles.module.css'

export function MockPage(props: { containerWidth?: number; maxWidth: number } & PropsWithChildren) {
  const { containerWidth, maxWidth } = props
  const width = containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth
  const height = Math.ceil(width * 1.414)

  return (
    <div className={styles.mockPage} style={{ width: `${width}px`, height: `${height}px` }}>
      {props.children}
    </div>
  )
}

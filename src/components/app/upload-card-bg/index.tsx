import React, { PropsWithChildren } from 'react'
import cn from 'classnames'

import styles from './styles.module.css'

export function UploadCardBg(props: PropsWithChildren & { className?: string }) {
  return <div className={cn(styles.card, props.className)}>{props.children}</div>
}
